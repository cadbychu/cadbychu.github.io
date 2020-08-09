    
        // Your web app's Firebase configuration
        var firebaseConfig = {
        apiKey: "AIzaSyCNy4SfH4DnOqVd8oUrJu_-nreG8NhGPf0",
        authDomain: "resume-d3f10.firebaseapp.com",
        databaseURL: "https://resume-d3f10.firebaseio.com",
        projectId: "resume-d3f10",
        storageBucket: "resume-d3f10.appspot.com",
        messagingSenderId: "22762866453",
        appId: "1:22762866453:web:9fcdb88469d9ad846a0b1c",
        measurementId: "G-2SC128XY6E"
        };
        // Initialize Firebase
        var defaultProject = firebase.initializeApp(firebaseConfig);
        var db= firebase.firestore();
        
        //get "others" data 
        db.collection("others").get().then(function(snapshot){
            snapshot.forEach(function(doc){
            if(doc.data().welcome != undefined)
                welcome.append(doc.data().welcome+'');
            if (doc.data().briefdesc != undefined)
                briefdesc.append(doc.data().briefdesc+'');
            if (doc.data().introduction != undefined)
               introduction.append(doc.data().introduction+'');
            if (doc.data().js != undefined)
                js.append(doc.data().js+'');
            if (doc.data().htmlcss != undefined)
               htmlcss.append(doc.data().htmlcss+'');
            if (doc.data().jq != undefined)
                jq.append(doc.data().jq+'');
            if (doc.data().c != undefined)
                c.append(doc.data().c+'');
            });
        });
        
        //get education data
        const edu= document.querySelector('#edu-list')
        db.collection("education").orderBy('year_end','desc').get().then(function(snapshot){
            snapshot.forEach(function(doc) {
               let li= document.createElement('li');
               let school=document.createElement('h2');
               let degree=document.createElement('h3');
               let year=document.createElement('h5');

               li.setAttribute('data-id', doc.id);
               degree.textContent= doc.data().Degree;
               school.textContent= doc.data().School;
               year.textContent= doc.data().year_start+'-'+doc.data().year_end;

                li.appendChild(school);
                li.appendChild(degree);
                li.appendChild(year);
               edu.appendChild(li);
            });
        });

        //get org data
        const org= document.querySelector('#org-list')
        db.collection("organizations").orderBy('year_start','desc').get().then(function(snapshot){
            snapshot.forEach(function(doc) {
               let li= document.createElement('li');
               let name=document.createElement('h2');
               let position=document.createElement('h3');
               let year=document.createElement('h5');

               li.setAttribute('data-id', doc.id);
               name.textContent= doc.data().name;
               position.textContent= doc.data().position;
               year.textContent= doc.data().year_start+'-'+ doc.data().year_end;

                li.appendChild(name);
                li.appendChild(position);
                li.appendChild(year);
                org.appendChild(li);
            });
        });

     //get works data
        const work= document.querySelector('#work-list')
        db.collection("works").orderBy("year_start").get().then(function(snapshot){
            snapshot.forEach(function(doc) {
            
               let li= document.createElement('li');
               let name=document.createElement('h2');
               let creator=document.createElement('h3');
               let link=document.createElement('a');
               let year_start=document.createElement('h5');

               li.setAttribute('data-id', doc.id);
               name.textContent= doc.data().name;
               creator.textContent= doc.data().creator;
               link.textContent= "Check it out!";
               link.href= doc.data().link;
               year_start.textContent= doc.data().year_start;

                li.appendChild(name);
                li.appendChild(creator);
                li.appendChild(year_start);
                li.appendChild(link);
               work.appendChild(li);
            });
        });

        //get contact data
        const contact= document.querySelector('#contact-list')
        db.collection("contacts").get().then(function(snapshot){
            snapshot.forEach(function(doc) {
                if(doc.data().github != undefined || doc.data().linkedin != undefined || doc.data().twitter != undefined){
               let li= document.createElement('li');
               let github=document.createElement('a');
               let linkedin=document.createElement('a');
               let twitter=document.createElement('a');
               let facebook=document.createElement('a');
               let githubimg = document.createElement("img");
               let facebookimg = document.createElement("img");
               let twitterimg=document.createElement("img");
               let linkedinimg = document.createElement("img");

               li.setAttribute('data-id', doc.id);
               github.href= doc.data().github;
               githubimg.src="https://cdn2.iconfinder.com/data/icons/social-icons-grey/512/GITHUB-512.png";
               githubimg.height=30;
               githubimg.width=30;
               linkedin.href= doc.data().linkedin;
               linkedinimg.src="https://hotelatlantis.com/wp-content/uploads/2017/12/linkedin-grey.png";
               linkedinimg.height=30;
               linkedinimg.width=30;
               twitter.href= doc.data().twitter;
               twitterimg.src="https://listaland.files.wordpress.com/2014/04/twitter-xxl.png";
               twitterimg.height=30;
               twitterimg.width=30;
               facebook.href= doc.data().facebook;
               facebookimg.src= "https://clipart.info/images/ccovers/1509135109gray-facebook-logo-png.png";
               facebookimg.height=30;
               facebookimg.width=30;


                li.appendChild(github);
                github.appendChild(githubimg);
                li.appendChild(linkedin);
                linkedin.appendChild(linkedinimg);
                li.appendChild(twitter);
                twitter.appendChild(twitterimg);
                li.appendChild(facebook);
                facebook.appendChild(facebookimg);
               contact.appendChild(li);
                }
            });
        });
        