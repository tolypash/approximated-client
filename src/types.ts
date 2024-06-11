export interface APIResponse<T> {
  data: T;
}

export type CreateVirtualHostRequest = {
  /** The custom domain that you'd like to route. */
  incoming_address: string;
  /** The address that you'd like requests for the custom domain to be routed to. Typically another domain or domain with a sub-page. */
  target_address: string;
  /** This sets the port that you'd like requests to arrive at on the target address. By default it is port 443 as that is the port that web traffic secured by SSL is typically served from. */
  target_ports?: string;
  /** Set this to true if you'd like to have requests be 301 redirected to the target address instead of proxied.
   *
   * Note: redirects need to have the protocol (http:// or https://) included in the target_address, or they will be appended to the incoming address.
   **/
  redirect?: boolean;
  /**
   * Set this to true if you'd like to have requests that exactly match the incoming address, including paths, be overridden and routed somewhere specific. Typically this is used in combination with another virtual host configured for the base custom domain.
   *
   * Note: this will ignore any extra user-added paths or queries if it matches, and will override any other virtual hosts for the same domain that don't exactly match.
   **/
  exact_match?: boolean;
  /**
   * For convenience, when set to true, Approximated will create a second virtual host as well that will 301 redirect the www version of the incoming address to this address.
   */
  redirect_www?: boolean;
  /**
   * Set this to true if you'd like the Host header to be left as the incoming address (the custom domain) for this virtual host. Set to false if you'd like to override the cluster default setting for this, or null if you'd like to use the default setting.
   *
   * Note: when set to false, either by default or when explicitly set here, your cluster will change the Host header for each request to the target address by default. This can often avoid issues with servers/reverse proxies out of the box.
   **/
  keep_host?: boolean;
};

export type CreateVirtualHostResponseData = {
  id: number;
  incoming_address: string;
  target_address: string;
  target_ports: string;
  user_message: string;
};

export type CreateVirtualHostResponse =
  APIResponse<CreateVirtualHostResponseData>;

export type GetVirtualHostRequest = {
  incoming_address: string;
};

export type GetVirtualHostResponseData = {
  apx_hit: boolean;
  created_at: Date;
  dns_pointed_at: string;
  has_ssl: boolean;
  id: number;
  incoming_address: string;
  is_resolving: boolean;
  last_monitored_humanized: string;
  last_monitored_unix: number;
  ssl_active_from: Date;
  ssl_active_until: Date;
  status: string;
  status_message: string;
  target_address: string;
  target_ports: string;
};

export type GetVirtualHostResponse = APIResponse<GetVirtualHostResponseData>;

export type UpdateVirtualHostRequest = {
  /** The custom domain for an existing Virtual Host. */
  current_incoming_address: string;
  /** A new custom domain you would like to change the existing Virtual Host to. */
  incoming_address?: string;
  /** The address that you'd like requests for the custom domain to be routed to. Typically another domain or domain with a sub-page. */
  target_address?: string;
  /** This sets the port that you'd like requests to arrive at on the target address. By default it is port 443 as that is the port that web traffic secured by SSL is typically served from. */
  target_ports?: string;
  /** Set this to true if you'd like to have requests be 301 redirected to the target address instead of proxied.
   *
   * Note: redirects need to have the protocol (http:// or https://) included in the target_address, or they will be appended to the incoming address.
   */
  redirect?: boolean;
  /**
   * Set this to true if you'd like to have requests that exactly match the incoming address, including paths, be overridden and routed somewhere specific. Typically this is used in combination with another virtual host configured for the base custom domain.
   *
   * Note: this will ignore any extra user-added paths or queries if it matches, and will override any other virtual hosts for the same domain that don't exactly match.
   */
  exact_match?: boolean;
  /**
   * For convenience, when set to true, Approximated will create a second virtual host as well that will 301 redirect the www version of the incoming address to this address.
   */
  redirect_www?: boolean;
};

export type UpdateVirtualHostResponseData = {
  apx_hit: boolean;
  created_at: Date;
  dns_pointed_at: string;
  has_ssl: boolean;
  id: number;
  incoming_address: string;
  is_resolving: boolean;
  last_monitored_humanized: string;
  last_monitored_unix: number;
  ssl_active_from: Date;
  ssl_active_until: Date;
  status: string;
  status_message: string;
  target_address: string;
  target_ports: string;
};

export type UpdateVirtualHostResponse =
  APIResponse<UpdateVirtualHostResponseData>;

export type DeleteVirtualHostRequest = {
  incoming_address: string;
};

export type RecordRequest = {
  /** The address of the record you want to check. Typically a domain/subdomain. Do not use placeholders like @ that you may see in DNS dashboards, but rather the complete address. */
  address: string;
  /**
   * This is the value that you'd like the record value to be compared against. The value here can be any string, as all record values will be converted to strings.
   *
   * Note: there can be multiple records/values for the same address. This endpoint will only return "match": true if there is exactly one record, and that record exactly matches this field.
   **/
  match_against: string;
  /** The DNS record type you'd like to check, formatted as a lowercase string. */
  type: string;
};

export type CheckDNSRecordsMatchExactlyRequest = {
  /** A list of DNS records you'd like to check. */
  records: RecordRequest[];
};

export interface RecordResponse {
  actual_values: string[];
  address: string;
  match: boolean;
  match_against: string;
  type: string;
}

export type CheckDNSRecordsMatchExactlyResponseData = {
  records: RecordResponse[];
};

// Does not extend APIResponse
export type CheckDNSRecordsMatchExactlyResponse =
  CheckDNSRecordsMatchExactlyResponseData;

export type CheckDNSRecordsExistRequest = {
  records: RecordRequest[];
};

export type CheckDNSRecordsExistResponseData = {
  records: RecordResponse[];
};

// Does not extend APIResponse
export type CheckDNSRecordsExistResponse = CheckDNSRecordsExistResponseData;
