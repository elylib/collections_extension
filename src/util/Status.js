const ERROR_RED = '#ff3c3c';
const SUCCESS_GREEN = '#39e603';
const CAUTION_YELLOW = '#efeb4f';

export const requestStates = {
    success: {text: 'Success!', style: {color: SUCCESS_GREEN}},
    failure: {text: 'Error', style: {color: ERROR_RED}},
    pending: {text: 'Request Pending', style: {color: CAUTION_YELLOW}},
    auth_failure: {text: 'Authorization Failed', style: {color: ERROR_RED}},
    invalid_id: {text: 'Your Westfield ID is not authorized for this application.', style: {color: ERROR_RED}},
    clear: {text: '', style: {color: ''}}
};

export function setStatusMessage(status, statusDiv) {
    // request-status div might be dynamically inserted, so we look for it.
    if (statusDiv) {
        statusDiv.style.color = status.style.color;
        statusDiv.textContent = status.text;
    }
}