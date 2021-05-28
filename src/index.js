const fetch = require('node-fetch');
const config = require('../config_files/config');

//await fetchCatalogs()=> getting universities' Hydra API Documentations
//getCoursesByAPIDocumentation(url, startDateQuery, subjectQuery)=>getting universities' courses 

async function fetchCatalogs() {
    let urlAPIDocumentations = [];
    for (let universityConfig of config.universities) {
        let url = universityConfig.uri;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data['@context']['dcat'])
                if (data['@context']['dcat'] === 'http://www.w3.org/ns/dcat#')
                    if (data['@type'] === 'Catalog')
                        for (let dataset of data['dataset'])
                            if (dataset['subject'] === 'Course')
                                if (data['@context']['Course'] === 'teach:Course' || data['@context']['Course'] === 'aiiso:Course')
                                    if (dataset['Distribution:accessURL'])
                                        if (validarAPIDocumentation(dataset['conformsTo'])) {
                                            urlAPIDocumentations.push(dataset['conformsTo']);
                                        }
        } catch (e) {
            continue;
        }

    }
    return urlAPIDocumentations;
}
async function validarAPIDocumentation(url) {
    let result = false;
    try {
        const response = await fetch(url);
        const data = await response.json();
        for (let supportedOperation of data['hydra:supportedOperation']) {
            for (let property of supportedOperation['hydra:property']) {
                if (property['hydra:template'].indexOf("?startDate={startDateQuery}&subject={subjectQuery}") != -1) {
                    result = true;
                }
            }
        }
    } catch (e) {
        return false;
    }
    return result;
}

async function getCoursesByAPIDocumentation(urlAPIDocumentation, startDateQuery, subjectQuery) {
    let courses = [];
    try {
        const response = await fetch(urlAPIDocumentation);
        const data = await response.json();
        let template = "";
        let startDateVariableName = "";
        let subjectVariableName = "";
        let auxarray = [];
        for (let supportedOperation of data['hydra:supportedOperation']) {
            if (supportedOperation['hydra:return'] === 'application/json') {
                template = supportedOperation['hydra:property']['hydra:template'];
                for (let mapping of supportedOperation['hydra:property']['hydra:mapping']) {
                    if (mapping['hydra:property'] === 'courseOntology:startDateQuery') {
                        startDateVariableName = mapping['hydra:variable'];
                        auxarray = template.split("{" + startDateVariableName + "}");
                        template = auxarray[0] + startDateQuery + auxarray[1];

                    }
                    else if (mapping['hydra:property'] === 'courseOntology:subjectQuery') {
                        subjectVariableName = mapping['hydra:variable'];
                        auxarray = template.split("{" + subjectVariableName + "}");
                        template = auxarray[0] + subjectQuery + auxarray[1];

                    }
                }
            }
        }
        let flag = true;
        while (flag) {
            const response2 = await fetch(template);
            const data2 = await response2.json();
            for (let courseaux of data2['Courses hydra jsonld']['@graph']) {
                courses.push(courseaux)
            }
            if (data2['Courses hydra jsonld']['hydra:next'] != null) {
                template = data2['Courses hydra jsonld']['hydra:next']
            }
            else {
                flag = false;
            }
        }

    } catch (e) {
        console.log("error");
        return {};
    }
    return courses;

}


//**Testing the client app**//
async function Testing() {
    let startDateQuery = "2010-02-02";
    let subjectQuery = "knowledge_management";
    let courses = [];
    let coursesaux = [];
    let apidocumentations = await fetchCatalogs();
    for (let i = 0; i < apidocumentations.length; i++) {
        coursesaux = await getCoursesByAPIDocumentation(apidocumentations[i], startDateQuery, subjectQuery);
        let size = coursesaux.length
        for (let j = 0; j < size; j++)
            courses.push(coursesaux[j])
    }
    courses.sort((firstitem, seconditem) => firstitem.startDate - seconditem.startDate);
    console.log(courses)
}

Testing()









