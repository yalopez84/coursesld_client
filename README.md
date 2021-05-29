## coursesld_client 🎯

![imagen](https://user-images.githubusercontent.com/57901401/120086512-91a02980-c0ad-11eb-8ef7-14b8c7cf318d.png)


#### Dependencies
 -[rawdata_api](https://github.com/yalopez84/rawdata_api "rawdata_api")
 
 -[coursesld_server](https://github.com/yalopez84/coursesld_server "coursesld_server")

 #### Tecnologies 
    -nodejs

#### Configuration files

    -module.exports = {
     universities: [        
        {
            name:'Central University Marta Abreu de Las Villas',
            uri: 'http://localhost:3000/ld/universities/ucl'
        },
        { 
            name:'University of Informatics Science',
            uri: 'http://localhost:4000/ld/'  
        },
        {
            name:'University of Havana',
            uri: 'http://localhost:3000/ld/universities/uh'
        }
    ] 
}
#### Objective
    -Getting linked courses from (coursesld_server) university interfaces via automatic client-server communication.

#### Explanation
    -Course recommender apps quite often request courses that start after a target date and related to a target subject.
    -coursesld_server was presented as a customized interface to publish courses according to client apps needs.
    -coursesld_server is presented as a complement of other interfaces such as traditional interfaces (e.g. SPARQL endpoints) and low cost interfaces like Triple          Pattern Fragments, specifically to linked university platforms.
    -The automatic client-server communication is because of tecnologies such as: Hydra/Tree included Hydra API Documentations and the DCAT 2 metadata vocabulary.
    -coursesld_client is able to query several coursesld_server interfaces (federated queries over multiple universities) following the next steps:
      1-Accessing to university catalogs,
      2-Accessing to Hydra API Documentations,
      3-Accessing to coursesld_server interfaces and requesting courses by the variables start date and subject.
      4-Reassembling course fragments from different universities.
      
      A part of the code can be seen below:
      
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
    

#### Running the component
    -node src/index.js

