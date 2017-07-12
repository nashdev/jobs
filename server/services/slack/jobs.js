/* 
THIS NEEDS A TON OF WORK - REFACTOR.
Dumped this here for reference while live-coding.

Todo:

Create `create`, `update`, `patch` listeners for jobs.
Update `Jobs` controller to dispatch events when these actions happen.
*Maybe use redux/actions for this on the server side? might be fun? meh. idk.*

*/
const Bot = require("./bot");
const JOBS_CHANNEL = "C04R7K3JV";

module.exports = function() {
  const bot = new Bot(process.env.SLACK_API_TOKEN);

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

      :newspaper: *Add a new job listing*

      For now, send a POST request (cURL/Postman) to \`https://nashdev-jobs.herokuapp.com/jobs\`.

      *JSON Payload:* \`\`\`
        {
          "title": "Post Title",
          "description": "Long-form Description",
          "addedBy": "your slack username",
          "link": "http://domain.com/path/to/apply"
        }
      \`\`\`
      *Example cURL:* \`\`\`
      curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
        "title": "test job 2",
        "description": "description",
        "addedBy": "wgolden",
        "link": "http://google.com"
      }' "https://nashdev-jobs.herokuapp.com/jobs"
      \`\`\`


      _Note_: You have full CRUD access. Please be respectful and do not abuse this system.
    `
    );
  });

  // Listen for !jobs list <skip>
  bot.listen(/(^!jobs list)\s?(\d+)?$/i, (msg, args) => {
    let skip = parseInt(args[2] || 0);
    let query = { query: { $skip: skip, $sort: { createdAt: -1 } } };
    jobs.find(query).then(res => {
      let limit = res.limit;
      let total = res.total;

      let listings = res.data
        .map(
          job => `
        - *${job.title}* posted by @${job.addedBy} on ${moment(
            job.createdAt
          ).fromNow()}. Type: \`!jobs view ${job._id}\` for more details.`
        )
        .join("");

      bot.send(
        msg.user,
        `
        *:awesome: NashDev Jobs!*

        :newspaper: Showing ${res.data
          .length}/${total} recent jobs. Skipping ${skip}:
        ${listings}

        Type: \`!jobs list ${skip + limit}\` to list ${limit} more;

        Visit https://nashdev-jobs.herokuapp.com/jobs for the full list of posts.
      `
      );
    });
  });

  // Listen for !jobs view <id>
  bot.listen(/^!jobs view ([0-9a-fA-F]{24})$/i, (msg, args) => {
    let postId = args[1] || null;

    if (!postId) {
      bot.send(msg.user, "Sorry. That post could not be found.");
    }

    jobs.get(postId, {}).then(res => {
      bot.send(
        msg.user,
        `
        *:awesome: NashDev Jobs!*

        :newspaper: Showing *${res.title}*
        ${res.description}

        Visit https://nashdev-jobs.herokuapp.com/jobs/${res._id} for the full listing.
      `
      );
    });
  });

  jobs.on("created", job => {
    let text = `
      :awesome: *New Job added by ${job.addedBy}*

        *_${job.title}_*:
        > ${job.description}

        ___________________________
        Learn more: ${job.link}
        Visit https://nashdev-jobs.herokuapp.com/jobs/${job._id} for the full listing.

      `;

    bot.post(JOBS_CHANNEL, text);
  });

  jobs.on("patched", job => {
    let text = `
      :awesome: *Job updated by ${job.addedBy}*

        *_${job.title}_*:
        > ${job.description}

        ___________________________
        Learn more: ${job.link}
        Visit https://nashdev-jobs.herokuapp.com/jobs/${job._id} for the full listing.
      `;
    bot.post(JOBS_CHANNEL, text);
  });
};
