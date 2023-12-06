export const youtubeLink = {
  video: (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`,
  embed: (videoId: string) => `https://www.youtube.com/embed/${videoId}`,
  channel: (channelId: string) => `https://www.youtube.com/channel/${channelId}`,
};
