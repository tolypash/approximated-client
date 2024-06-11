import {
  APIResponse,
  CheckDNSRecordsExistRequest,
  CheckDNSRecordsExistResponse,
  CheckDNSRecordsMatchExactlyRequest,
  CheckDNSRecordsMatchExactlyResponse,
  CreateVirtualHostRequest,
  CreateVirtualHostResponse,
  DeleteVirtualHostRequest,
  GetVirtualHostRequest,
  GetVirtualHostResponse,
  UpdateVirtualHostRequest,
  UpdateVirtualHostResponse,
} from "./types";

const defaultFetch = require("node-fetch")

export const DEFAULT_APPROXIMATED_API_BASE_URL =
  "https://cloud.approximated.app/api";

export type ApproximatedClientOptions = {
  /** Your Approximated API key.
   *
   * https://approximated.app/docs/#using-api-keys
   **/
  apiKey: string;
  /** Custom base URL (only use it if you know what you're doing) */
  baseURL?: string;
};

export class ApproximatedClient {
  private apiKey: string = "";
  private baseURL: string = DEFAULT_APPROXIMATED_API_BASE_URL;

  constructor(options: ApproximatedClientOptions) {
    if (!options.apiKey) {
      throw new Error("apiKey is required");
    }

    if (options.baseURL) {
      this.baseURL = options.baseURL;
    }
  }

  private async fetch<T>({
    path,
    ...options
  }: {
    path: string;
    text?: boolean;
    method: RequestInit["method"];
    body?: RequestInit["body"];
  }): Promise<T> {
    const res = await defaultFetch(`${this.baseURL}${path}`, {
      headers: {
        "api-key": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    if (options.text) {
      return (await res.text()) as T;
    } else {
      return (await res.json()) as T;
    }
  }

  /** https://approximated.app/docs/#create-virtual-host */
  public async createVirtualHost(
    req: CreateVirtualHostRequest
  ): Promise<CreateVirtualHostResponse> {
    return await this.fetch<APIResponse<CreateVirtualHostResponse>>({
      path: "/vhosts",
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res.data);
  }

  /** https://approximated.app/docs/#read-virtual-host */
  public async getVirtualHost(
    req: GetVirtualHostRequest
  ): Promise<GetVirtualHostResponse> {
    return await this.fetch<APIResponse<GetVirtualHostResponse>>({
      path: "vhosts/by/incoming/" + req.incoming_address,
      method: "GET",
    }).then((res) => res.data);
  }

  /** https://approximated.app/docs/#update-virtual-host */
  public async updateVirtualHost(
    req: UpdateVirtualHostRequest
  ): Promise<UpdateVirtualHostResponse> {
    return await this.fetch<APIResponse<UpdateVirtualHostResponse>>({
      path: "/vhosts/update/by/incoming",
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res.data);
  }

  /** https://approximated.app/docs/#delete-virtual-host */
  public async deleteVirtualHost(
    req: DeleteVirtualHostRequest
  ): Promise<string> {
    return await this.fetch<string>({
      path: "/vhosts/delete/by/incoming" + req.incoming_address,
      method: "DELETE",
      text: true,
    }).then((res) => res);
  }

  /** https://approximated.app/docs/#dns-check-records-match-exactly */
  public async checkDNSRecordsMatchExactly(
    req: CheckDNSRecordsMatchExactlyRequest
  ): Promise<CheckDNSRecordsMatchExactlyResponse> {
    return await this.fetch<CheckDNSRecordsMatchExactlyResponse>({
      path: "/dns/check-records-match-exactly",
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res);
  }

  /** https://approximated.app/docs/#dns-check-records-exist */
  public async checkDNSRecordsExist(
    req: CheckDNSRecordsExistRequest
  ): Promise<CheckDNSRecordsExistResponse> {
    return await this.fetch<CheckDNSRecordsExistResponse>({
      path: "/dns/check-records-match-exactly",
      method: "POST",
      body: JSON.stringify(req),
    }).then((res) => res);
  }
}
