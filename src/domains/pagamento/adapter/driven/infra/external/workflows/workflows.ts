import { AxiosResponse, create } from "axios"
import { GoogleAuth } from "google-auth-library"

export class WorkflowsExternal {
  constructor() {}

  async callback(endpoint: string, payload: object): Promise<AxiosResponse> {

    const auth = new GoogleAuth();
    const token = await auth.getAccessToken();

    const axios = create({
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return axios.post(
      endpoint,
      payload
    )
  }
}