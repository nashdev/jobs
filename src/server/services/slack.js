import { WebClient } from "@slack/client";
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

  notify = async ({ job }) => {
    const {
      id: jobId,
      userId,
      companyId,
      title,
      type,
      recruiter,
      salary,
      short_description: shortJobDescription,
      remote_available: remoteAvailable,
    } = job;

    const { slackId } = await UsersRepository.getById(userId);

    const {
      name,
      short_description: shortCompanyDescription,
    } = await CompaniesRepository.getById(companyId);

    try {
      return await this.client.chat.postMessage({
        channel: this.channel,
        link_names: true,
        text: `<@${slackId}> posted a new job on Nashdev/Jobs.`,
        attachments: JSON.stringify([
          {
            title,
            text: shortJobDescription,
            color: "#74c8ed",
            fields: [
              {
                title: "Job Type",
                value: FILTER_MAP[type],
                short: true,
              },
              {
                title: "Salary",
                value: salary,
                short: true,
              },
              {
                title: "Remote Available",
                value: remoteAvailable ? "Yes" : "No",
                short: true,
              },
              {
                title: "Using Recruiter",
                value: recruiter ? "Yes" : "No",
                short: true,
              },
            ],
          },
          {
            title: `About ${name}`,
            text: shortCompanyDescription,
            color: "#3060f0",
            actions: [
              {
                type: "button",
                text: `Learn more about ${name}`,
                url: `https://jobs.nashdev.com/company/${companyId}`,
              },
              {
                type: "button",
                text: `Apply`,
                style: "primary",
                url: `https://jobs.nashdev.com/job/${jobId}`,
              },
            ],
          },
        ]),
      });
    } catch (error) {
      console.error("Error sending slack message", error);
    }
  };
}

export default new SlackService();
