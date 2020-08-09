    
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
            function getOther(doc){
                if(doc.data().welcome != undefined)
                    welcome.append(doc.data().welcome+'');
                if (doc.data().briefdesc != undefined)
                    briefdesc.append(doc.data().briefdesc+'');
                if (doc.data().introduction != undefined){
                   textIntro.append(doc.data().introduction+'');
                   editInfo.append(doc.data().introduction+'');
                };
                if (doc.data().js != undefined)
                    js.append(doc.data().js+'');
                if (doc.data().htmlcss != undefined)
                   htmlcss.append(doc.data().htmlcss+'');
                if (doc.data().jq != undefined)
                    jq.append(doc.data().jq+'');
                if (doc.data().c != undefined)
                    c.append(doc.data().c+'');
            }
             //listen for change in db(others)
             db.collection('others').onSnapshot(snapshot=>{
                let changes= snapshot.docChanges();
                changes.forEach(change =>{
                   if(change.type == 'added'){
                    getOther(change.doc);
                    }else if(change.type == 'modified'){
                        document.querySelector('#textIntro').innerHTML="";
                        document.querySelector("#welcome").innerHTML="";
                        document.querySelector("#briefdesc").innerHTML="";
                        getOther(change.doc);
                    };
                });
            });
        
            //get contact data
            const contact= document.querySelector('#contact-list')
            function getContact(doc){
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
                    
                    
                   githubField.value=doc.data().github; 
                   twitterField.value=doc.data().twitter;
                   facebookField.value=doc.data().facebook;
                   linkedinField.value= doc.data().linkedin;
                    
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
            };
            //listen for change in db(others)
            db.collection('contacts').onSnapshot(snapshot=>{
               let changes= snapshot.docChanges();
               changes.forEach(change =>{
                  if(change.type == 'added'){
                        getContact(change.doc);
                   }else if(change.type == 'modified'){
                       contact.innerHTML="";
                       getContact(change.doc);
                   };
               });
            });
   
            //get education data
            const edu= document.querySelector('#edu-list')
            function listEdu(doc){
                   let li= document.createElement('li');
                   let school=document.createElement('h2');
                   let degree=document.createElement('h3');
                   let year=document.createElement('h5');
                   let buttonedu=document.createElement('button');
    
                    li.setAttribute('data-id', doc.id);
                    degree.textContent= doc.data().Degree;
                    school.textContent= doc.data().School;
                    year.textContent= doc.data().year_start+'-'+doc.data().year_end;
                    buttonedu.textContent="X";
                    buttonedu.style.fontSize="20px";

                    li.appendChild(school);
                    li.appendChild(degree);
                    li.appendChild(year);
                    edu.appendChild(li);
                    li.appendChild(buttonedu);
                     
                    //delete data from db
                    buttonedu.addEventListener('click', (e) =>{
                        e.stopPropagation();
                        let uid= e.target.parentElement.getAttribute('data-id');
                        db.collection('education').doc(uid).delete();
                    });
            };
            //listen for change in db(edu)
            db.collection('education').orderBy('year_end','desc').onSnapshot(snapshot=>{
                let changes= snapshot.docChanges();
                changes.forEach(change =>{
                    if(change.type == 'added'){
                        listEdu(change.doc);
                    }else if (change.type == 'removed'){
                        let li= edu.querySelector('[data-id='+change.doc.id+']');
                        console.log(li);
                        edu.removeChild(li);
                        alert("Item deleted.");
                    };
                });
            });
            
    
            //get org data
            const org= document.querySelector('#org-list')
            function listOrg(doc){
                let li= document.createElement('li');
                let name=document.createElement('h2');
                let position=document.createElement('h3');
                let year=document.createElement('h5');
                let buttonorg =document.createElement('button');
                 
                li.setAttribute('data-id', doc.id);
                name.textContent= doc.data().name;
                position.textContent= doc.data().position;
                year.textContent= doc.data().year_start+'-'+ doc.data().year_end;
                buttonorg.textContent="X";
                buttonorg.style.fontSize="20px";

                 li.appendChild(name);
                 li.appendChild(position);
                 li.appendChild(year);
                 li.appendChild(buttonorg);
                 org.appendChild(li);

                 //delete data from db
                 buttonorg.addEventListener('click', (e) =>{
                    e.stopPropagation();
                    let uid= e.target.parentElement.getAttribute('data-id');
                    db.collection('organizations').doc(uid).delete();
                });
            };
            //listen for change in db(org)
            db.collection('organizations').orderBy('year_start','desc').onSnapshot(snapshot=>{
                let changes= snapshot.docChanges();
                changes.forEach(change =>{
                    if(change.type == 'added'){
                        listOrg(change.doc);
                    }else if (change.type == 'removed'){
                        let li= org.querySelector('[data-id='+change.doc.id+']');
                        org.removeChild(li);
                        alert("Item deleted.");
                    }
                });
            }); 
            
           

         //get works data
            const work= document.querySelector('#work-list')
            function listWork(doc){
                let li= document.createElement('li');
                let name=document.createElement('h2');
                let creator=document.createElement('h3');
                let link=document.createElement('a');
                let year_start=document.createElement('h5');
                let buttonwork=document.createElement('button');
                let div=document.createElement('div');

 
                li.setAttribute('data-id', doc.id);
                name.textContent= doc.data().name;
                creator.textContent= doc.data().creator;
                link.textContent= "Check it out!";
                link.style.fontSize="16px";
                link.href= doc.data().link;
                year_start.textContent= doc.data().year_start;
                buttonwork.textContent="X";
                buttonwork.style.fontSize="20px";
                
                 li.appendChild(name);
                 li.appendChild(creator);
                 li.appendChild(year_start);
                 div.appendChild(link);
                 li.appendChild(div);
                 li.appendChild(buttonwork);
                 work.appendChild(li);

                //delete data from db
                buttonwork.addEventListener('click', (e) =>{
                    e.stopPropagation();
                    let uid= e.target.parentElement.getAttribute('data-id');
                    db.collection('works').doc(uid).delete();
                });
            };
            //listen for change in db(work)
            db.collection('works').orderBy('year_start').onSnapshot(snapshot=>{
                let changes= snapshot.docChanges();
                changes.forEach(change =>{
                    if(change.type == 'added'){
                        listWork(change.doc);
                    }else if (change.type == 'removed'){
                        let li= work.querySelector('[data-id='+change.doc.id+']');
                        work.removeChild(li);
                        alert("Item deleted.");
                    }
                });
            }); 
    
    

        
            //listen for change in db(contact)
            db.collection('others').onSnapshot(snapshot=>{
                let changes= snapshot.docChanges();
                changes.forEach(change =>{
                   if(change.type == 'added'){
                    
                    }else if(change.type == 'modified'){
                    
                    
                    };
                });
            });
            