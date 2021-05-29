## coursesld_client 🎯

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
    -coursesld_server is presented as an customized interface to publish courses according to those client apps needs. coursesld_client is an client app example presented as a proof of concept
    -coursesld_server is presented as complement of other interfaces such as traditional interfaces (e.g. SPARQL endpoint) and low cost interfaces like Triple Pattern Fragment specificaly to linked university platforms.
    -The automatic client-server communication is because of tecnologies such as: Hydra/Tree included HydraAPIDocumentations and the DCAT 2 metadata vocabulary.

#### Instalation steps
    -node src/index.js

