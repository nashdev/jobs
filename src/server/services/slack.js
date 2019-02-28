import { WebClient } from "@slack/client";
import { fallbackHttpConfig } from "apollo-link-http-common";
import CompaniesRepository from "../repositories/companies";
import UsersRepository from "../repositories/users";

const FILTER_MAP = {
  fulltime: "Full Time",
  parttime: "Part Time",
  freelance: "Freelance",
  contract: "Contract",
  temporary: "Temporary",
  internship: "Internship",
};

class SlackService {
  constructor() {
    this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
    this.channel = process.env.SLACK_JOBS_CHANNEL;
  }

  message = async ({ user, target, args }) => {
    const userId = user.slackId;
    const targetUserId = target.user.slackId;
    const { type } = args;
    const dm = await this.client.mpim.open({
      users: `${userId}, ${targetUserId}`,
    });

    let profileType;
    let actions = [];

    if (type === "COMPANY") {
      profileType = `company profile for "${target.company.name}"`;
      actions = [
        {
          type: "button",
          text: `${user.name}'s profile`,
          url: `https://jobs.nashdev.com/person/${user.id}`,
        },
        {
          type: "button",
          text: `${target.user.name}'s profile`,
          url: `https://jobs.nashdev.com/person/${target.user.id}`,
        },
        {
          type: "button",
          text: `About ${target.company.name}`,
          style: "primary",
          url: `https://jobs.nashdev.com/company/${target.company.id}`,
        },
      ];
    }

    if (type === "PERSON") {
      profileType = "User Profile";
      actions = [
        {
          type: "button",
          text: `${user.name}'s profile`,
          url: `https://jobs.nashdev.com/person/${user.id}`,
        },
        {
          type: "button",
          text: `${target.user.name}'s Profile`,
          url: `https://jobs.nashdev.com/person/${target.user.id}`,
        },
      ];
    }

    if (type === "JOB") {
      profileType = `job listing for "${target.job.title}"`;
      actions = [
        {
          type: "button",
          text: `${user.name}'s profile`,
          url: `https://jobs.nashdev.com/person/${user.id}`,
        },
        {
          type: "button",
          text: `${target.user.name}'s profile`,
          url: `https://jobs.nashdev.com/person/${target.user.id}`,
        },
        {
          type: "button",
          text: `Job Details`,
          style: "primary",
          url: `https://jobs.nashdev.com/job/${target.job.id}`,
        },
      ];
    }

    await this.client.chat.postMessage({
      channel: dm.group.id,
      text: `Hello <@${targetUserId}>! <@${userId}> sent you a message request via your *NashDev/Jobs* ${profileType}.`,
      attachments: JSON.stringify([
        {
          title: "I've started a conversation with both of you. Good luck!",
          text: "",
          color: "#74c8ed",
          actions,
        },
      ]),
    });

    return true;
  };

  notify = async ({ job }) => {
    const {
      id: jobId,
      userId,
      companyId,
      title,
      type,
      recruiter,
      salary,
      remote,
      website,
      short_description: shortJobDescription,
    } = job;

    // If the user has not provided salary information,
    // we will not want to notify the channel.
    if (job.salary === "Undisclosed") {
      return;
    }
    const { slackId } = await UsersRepository.getById(userId);

    const {
      name,
      short_description: shortCompanyDescription,
    } = await CompaniesRepository.getById(companyId);

    try {
      await this.client.chat.postMessage({
        channel: this.channel,
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "A new job was posted on jobs.nashdev.com",
            },
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Added by <@${slackId}>`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*<https://jobs.nashdev.com/job/${jobId}|${title}>*\n${name}`,
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Apply",
              },
              url: `https://jobs.nashdev.com/job/${jobId}`,
            },
          },

          {
            type: "divider",
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Job Type:*\n${FILTER_MAP[type]}`,
              },
              {
                type: "mrkdwn",
                text: `*Remote Available:*\n${remote ? "Yes" : "No"}`,
              },
              {
                type: "mrkdwn",
                text: `*Salary:*\n${salary}`,
              },
              {
                type: "mrkdwn",
                text: `*Using Recruiter:*\n${recruiter ? "Yes" : "No"}`,
              },
            ],
          },
          {
            type: "divider",
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Job Details:*\n${shortJobDescription}`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*About ${name}:*\n${shortCompanyDescription || "N/A"}`,
            },
          },
          {
            type: "divider",
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: `About ${name}`,
                },
                url: `https://jobs.nashdev.com/company/${companyId}`,
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Learn More",
                },
                url: `https://jobs.nashdev.com/job/${jobId}`,
              },
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Apply",
                },
                url: website || `https://jobs.nashdev.com/job/${jobId}`,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error sending slack message", error);
    }
  };
}

export default new SlackService();
