const envs = import.meta.env;

export default {
  baseApiUrl: envs.BASE_API_URL,
  id: envs.ID
};
