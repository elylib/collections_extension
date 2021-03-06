import {DOMElements} from "./DOMElements";

const Selectors = {
    amber: "amonroe",
    becca: "rbrody",
    brian: "bhubbard",
    corinne: "cebbs",
    ian: "imatzen",
    oliver: "ozeff",
    sarah: "sloudenslager",
    suzanne: "stiranno"
};

const SubjectAreas = [
    {code: "ART",  fullName: "Art", selector: Selectors.becca},
    {code: "BIOL", fullName: "Biology", selector: Selectors.brian},
    {code: "PHYS", fullName: "Chemical and Physical Sciences", selector: Selectors.brian},
    {code: "COMM", fullName: "Communication", selector: Selectors.becca},
    {code: "CAIS", fullName: "Computer and Information Science", selector: Selectors.brian},
    {code: "CRJU", fullName: "Criminal Justice", selector: Selectors.oliver},
    {code: "ECON", fullName: "Economics", selector: Selectors.oliver},
    {code: "EDUC", fullName: "Education", selector: Selectors.corinne},
    {code: "ENGL", fullName: "English", selector: Selectors.amber},
    {code: "ENVR", fullName: "Environmental Sciences", selector: Selectors.brian},
    {code: "EGST", fullName: "Ethnic and Gender Studies", selector: Selectors.amber},
    {code: "CONT", fullName: "Contingency", selector: Selectors.becca},
    {code: "DDA",  fullName: "On Demand", selector: Selectors.suzanne},
    {code: "GARP", fullName: "Geography and Regional Planning", selector: Selectors.brian},
    {code: "HIST", fullName: "History", selector: Selectors.brian},
    {code: "MATH", fullName: "Mathematics", selector: Selectors.corinne},
    {code: "MOVP", fullName: "Movement Sciences", selector: Selectors.corinne},
    {code: "MUSC", fullName: "Music", selector: Selectors.sarah},
    {code: "NURS", fullName: "Nursing", selector: Selectors.corinne},
    {code: "PHIL", fullName: "Philosophy", selector: Selectors.sarah},
    {code: "POLS", fullName: "Political Science", selector: Selectors.becca},
    {code: "PSYC", fullName: "Psychology", selector: Selectors.sarah},
    {code: "REF",  fullName: "Reference", selector: Selectors.brian},
    {code: "SOCW", fullName: "Social Work", selector: Selectors.oliver},
    {code: "SOCI", fullName: "Sociology", selector: Selectors.becca},
    {code: "LANG", fullName: "Language and Culture Studies", selector: Selectors.amber}
];

function getSelectorSubjectAreas(selector) {
    return SubjectAreas.filter(item => item.selector === selector);
}

export function buildOptions(selector) {
    /**
     * Get a selector's subject areas and build select options
     *
     * @subjectArea array  subject area objects above
     *
     * return a document fragment to be appended to the Select node
     */

    let frag = document.createDocumentFragment();
    getSelectorSubjectAreas(selector).forEach(item => {
        let newOption = document.createElement('option');
        newOption.value = item.code;
        newOption.textContent = item.fullName;
        frag.appendChild(newOption);
    });
    return frag;
}

export function setSubjectAreaSelectBox(selector, subjectArea) {
    let selectorSubjectAreas = getSelectorSubjectAreas(selector);
    DOMElements.subjectAreaSelect.appendChild(buildOptions(selector));
    DOMElements.subjectAreaSelect.value = subjectArea ? subjectArea : selectorSubjectAreas[0].code;
}

export function isAValidSelector(selector) {
    // Verify that a that input comes from one of our listed selectors
    for (let sel of Object.getOwnPropertyNames(Selectors)) {
        if (selector === Selectors[sel]) {
            return true;
        }
    }
    return false;
}
