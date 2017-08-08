/* 
THIS NEEDS A TON OF WORK - REFACTOR.
Dumped this here for reference while live-coding.

Todo:

Create `create`, `update`, `patch` listeners for jobs.
Update `Jobs` controller to dispatch events when these actions happen.
*Maybe use redux/actions for this on the server side? might be fun? meh. idk.*

*/
const Bot = require("./bot");
const eventEmitter = require("../../events");
const JOBS_CHANNEL = process.env.SLACK_JOBS_CHANNEL;
const moment = require("moment");
const Job = require("../../models/Job");
const pkg = require("../../../package.json");

const bot = new Bot(process.env.SLACK_API_TOKEN);

async function getUserByName(username) {
  const users = await bot.webClient.users.list();
  return users.members.find(u => u.name === username);
}

async function getChannels() {
  const channels = await bot.webClient.channels.list();
  return channels;
}

function filterChannelsByUser(res, userId) {
  return res.channels
    .filter(c => {
      return c.members.indexOf(userId) !== -1;
    })
    .map(c => `#${c.name}`);
}

async function whois(username) {
  const user = await getUserByName(username);
  const channels = await getChannels();
  const userChannels = await filterChannelsByUser(channels, user.id);
  return `@${user.name} (${user.profile.real_name} — ${user.profile
    .email}) is a member of ${userChannels.join(" ")}`;
}

module.exports = function() {
  // Listen for !jobs
  bot.listen(/^!jobs$/i, (msg, args) => {
    bot.send(
      msg.user,
      `
      *:awesome: Welcome to NashDev Jobs!*

      :newspaper: Would you like to view current job listings? Type \`!jobs list\`.

      :heavy_plus_sign: Want to add a job listing? Type \`!jobs add\` to learn how.

      :mag: Todo: Looking for work? Type \`!jobs profile\` to setup a profile (optional).

      :blush: p.s. you can DM @nashjobs and use me privately, if you'd like.

      NashDev Jobs API v. ${pkg.version}
    `
    );
  });

  // Listen for !jobs profile
  bot.listen(/^!jobs profile$/i, (msg, args) => {
    bot.send(
      msg.user,
      `
      *:awesome: NashDev Jobs!*

      :blush: This hasn't been implemented yet. Hang tight!
    `
    );
  });

  // Listen for !jobs add
  bot.listen(/^!jobs add$/i, (msg, args) => {
    bot.send(
      msg.user,
      `
      *:awesome: NashDev Jobs!*

      :heavy_plus_sign: *Add a new job listing*

      1. Signup with Github or Email. (${process.env.API_URL}/signup)
      2. Create a Company Profile. (${process.env.API_URL}/companies/add)
      3. Add your Job Listing. (${process.env.API_URL}/jobs/add)
      4. ...  
      5. Profit?
    `
    );
  });

  // Listen for !jobs list <page>
  bot.listen(/(^!jobs list)\s?(\d+)?$/i, (msg, args) => {
    let page = parseInt(args[2] || 1);
    Job.forge()
      .orderBy("created_at", "DESC")
      .fetchPage({
        page: page || 1,
        pageSize: 10,
        withRelated: ["user", "company"]
      })
      .then(jobs => {
        const page = jobs.pagination;
        jobs = jobs.toJSON();
        const listings = jobs
          .map(
            job => `
          - *${job.title}* at *${job.company
              .name}* in _${job.location}_ / @${job.contact_slack} (${job.user
              .name}) on ${moment(
              job.created_at
            ).fromNow()}. Type: \`!jobs view ${job.id}\` for more details.`
          )
          .join("");

        bot.send(
          msg.user,
          `
        *:awesome: NashDev Jobs!*

    
        :newspaper: Showing ${page.page > 1
          ? page.page * 10 - 10 + 1
          : 1} - ${page.page * 10 <= page.rowCount
            ? page.page * 10
            : page.rowCount} of ${page.rowCount}
        
        ${listings}

        Type: \`!jobs list ${page.page + 1}\` to list 10 more;

        Visit ${process.env
          .API_URL}/jobs/list/${page.page} for the full list of posts.
      `
        );
      });
  });

  // Listen for !jobs view <id>
  bot.listen(/^!jobs view ([0-9]+)$/i, (msg, args) => {
    let postId = args[1] || null;

    Job.where({ id: postId })
      .fetch({ withRelated: ["user", "company"] })
      .then(job => {
        if (!job) {
          bot.send(msg.user, "Sorry. That post could not be found.");
        }

        job = job.toJSON();

        bot.send(
          msg.user,
          `
        *:awesome: NashDev Jobs!*

        :newspaper: *${job.title}* at *${job.company.name}* in _${job.location}_
        ${job.description}
        
        Added: ${moment(job.created_at).calendar()}
        Updated: ${moment(job.updated_at).calendar()}
        ________________________________________________________________________________
        Visit ${process.env.API_URL}/jobs/${job.id} for the full listing.
      `
        );
      });
  });

  eventEmitter.on("jobs:created", job => {
    let text = `
      :awesome: *New Job Added* / @${job.contact_slack} (${job.user.name})
      
      *${job.title}* at *${job.company.name}* in _${job.location}_
      Added: ${moment(job.created_at).calendar()}
      ________________________________________________________________________________
      Visit ${process.env.API_URL}/jobs/${job.id} for the full listing.
      `;

    bot.post(JOBS_CHANNEL, text);
  });

  eventEmitter.on("jobs:updated", job => {
    let text = `
      :awesome: *Job Updated* / @${job.contact_slack} (${job.user.name})
      
      *${job.title}* at *${job.company.name}* in _${job.location}_
      Updated: ${moment(job.updated_at).calendar()}
      ________________________________________________________________________________
      Visit ${process.env.API_URL}/jobs/${job.id} for the full listing.
      `;
    bot.post(JOBS_CHANNEL, text);
  });

  // Listen for !whois
  bot.listen(/^!whois\s+(.*)$/i, (msg, args, user) => {
    // Limit this only to admins.
    if (user.is_admin) {
      whois(args[1]).then(res => {
        bot.send(
          user.id,
          `
          *:mag: WHOIS:*
          ${res}
        `
        );
      });
    }
  });
};
