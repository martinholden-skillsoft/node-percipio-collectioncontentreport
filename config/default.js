const moment = require('moment');
const defer = require('config/defer').deferConfig;

const config = {};

// Indicates a name for the configuration
config.customer = 'default';
config.startTimestamp = moment().utc().format('YYYYMMDD_HHmmss');
// Null logger object
config.logger = {};

// DEBUG Options - Enables the check for Fiddler, if running the traffic is routed thru Fiddler
config.debug = {};
// Debug logging
// One of the supported default logging levels for winston - see https://github.com/winstonjs/winston#logging-levels
config.debug.loggingLevel = 'info';
config.debug.path = 'results';
config.debug.filename = defer((cfg) => {
  return `${cfg.startTimestamp}_results.log`;
});

config.output = {};
// Output path
config.output.path = 'results';
// Filename
config.output.filename = defer((cfg) => {
  return `${cfg.startTimestamp}_results.json`;
});

// Report Generation Request
config.reportrequest = {};
// Request Timeout
config.reportrequest.timeout = 2000;
// Bearer Token
config.reportrequest.bearer = null;
// Base URI to Percipio API
config.reportrequest.baseURL = null;
// Request Path Parameters
config.reportrequest.path = {};
/**
 * Name: orgId
 * Description: Organization UUID
 * Required: true
 * Type: string
 * Format: uuid
 */
config.reportrequest.path.orgId = null;

// Request Query string Parameters
config.reportrequest.query = {};

// Request Body
config.reportrequest.body = {};
/**
 * Name: collectionName
 * Description : Collections used for content lookup, comma delimited and defaults to all
 * collections
 * Type: string
 */
config.reportrequest.body.collectionName = 'ALL';
/**
 * Name: sort
 * Description : The field to use for sorting and which order to sort in, if sort is not
 * included the results will be returned ascending by collection
 * Type: object
 */
config.reportrequest.body.sort = {};

/**
 * Name: field
 * Type: string
 * Enum: collection, channelTitle, contentId, contentTitle, contentType, status, description
 */
config.reportrequest.body.sort.field = 'collection';
/**
 * Name: order
 * Type: string
 * Enum: asc, desc
 */
config.reportrequest.body.sort.order = 'asc';
/**
 * Name: contentType
 * Description : Content types filter, comma delimited and default to all content types
 * Type: string
 * Example: AudioBook,Audio Summary,Book,Book Summary,Course,Linked Content
 */
config.reportrequest.body.contentType = null;
/**
 * Name: status
 * Description : Content status filter, comma delimited and defaults to all status type.
 * Type: string
 * Enum: Published, Retired, PendingRetirement
 */
config.reportrequest.body.status = null;
/**
 * Name: locale
 * Description : The field to use for specifying language. Will default to all when not
 * specified.  example format 'en' or 'fr' or 'de' etc.
 * Type: string
 */
config.reportrequest.body.locale = null;
/**
 * Name: sftpId
 * Description : SFTP Id associated with OrgId
 * Type: string
 * Format: uuid
 */
config.reportrequest.body.sftpId = null;
/**
 * Name: isFileRequiredInSftp
 * Description : Generated files are required to deliver in the respected sftp location.
 * Default value is true.
 * Type: boolean
 */
config.reportrequest.body.isFileRequiredInSftp = true;
/**
 * Name: zip
 * Description : Generate the reports in zip file format. Default value is false.
 * Type: boolean
 */
config.reportrequest.body.zip = null;
/**
 * Name: encrypt
 * Description : Generate the report file as PGP encrypted file. Default value is false.
 * Type: boolean
 */
config.reportrequest.body.encrypt = null;
/**
 * Name: formatType
 * Description : Format Type, defaults to JSON, the value is extracted from Accept attribute
 * in header
 * Type: string
 * Enum: JSON, CSV, TXT
 */
config.reportrequest.body.formatType = 'JSON';
/**
 * Name: fileMask
 * Description : Absolute or masked pattern for the generated report file. Example file masks
 * - fileName_{DD}{MM}{YYYY}, fileName_{ORG_ID}
 * Type: string
 */
config.reportrequest.body.fileMask = null;
/**
 * Name: folderName
 * Description : custom folder under sftp reports wherein the generated report file is to be
 * placed.
 * Type: string
 */
config.reportrequest.body.folderName = null;
/**
 * Name: includeMillisInFilename
 * Description : Generate files with unix based timestamp. Example -
 * fileName.csv.1561642446608
 * Type: boolean
 */
config.reportrequest.body.includeMillisInFilename = null;

// Method
config.reportrequest.method = 'post';
// The Service Path the placeholders {} are replaced by values from *.path
config.reportrequest.uritemplate =
  '/reporting/v1/organizations/{orgId}/report-requests/collections-content';

// Request
config.pollrequest = {};
// Request Timeout
config.pollrequest.timeout = 2000;
// Bearer Token
config.pollrequest.bearer = null;
// Base URI to Percipio API
config.pollrequest.baseURL = null;
// Request Path Parameters
config.pollrequest.path = {};
/**
 * Name: orgId
 * Description: Organization UUID
 * Required: true
 * Type: string
 * Format: uuid
 */
config.pollrequest.path.orgId = null;
/**
 * Name: reportRequestId
 * Description : Handle to access the report content
 * Required: true
 * Type: string
 */
config.pollrequest.path.reportRequestId = null;
// Request Query string Parameters
config.pollrequest.query = {};
// Request Body
config.pollrequest.body = null;
// Method
config.pollrequest.method = 'get';
// The Service Path the placeholders {} are replaced by values from *.path
config.pollrequest.uritemplate =
  '/reporting/v1/organizations/{orgId}/report-requests/{reportRequestId}';

// Global Web Retry Options for promise retry
// see https://github.com/IndigoUnited/node-promise-retry#readme
config.retry_options = {};
config.retry_options.retries = 3;
config.retry_options.minTimeout = 1000;
config.retry_options.maxTimeout = 2000;

/*
Polling options for retrying report availability
see https://github.com/IndigoUnited/node-promise-retry#readme
options is a JS object that can contain any of the following keys:
retries: The maximum amount of times to retry the operation.Default is 10.
Seting this to 1 means do it once, then retry it once.
factor: The exponential factor to use.Default is 2.
minTimeout: The number of milliseconds before starting the first retry.Default is 1000.
maxTimeout: The maximum number of milliseconds between two retries.Default is Infinity.
randomize: Randomizes the timeouts by multiplying with a factor between 1 to 2. Default is false.
*/

config.polling_options = {};
config.polling_options.retries = 20;
config.polling_options.minTimeout = 60 * 1000;
config.polling_options.maxTimeout = Infinity;
// Using Factor=1 means polling at fixed interval of minTimeout
config.polling_options.factor = 1;

module.exports = config;
