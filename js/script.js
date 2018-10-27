document.addEventListener("DOMContentLoaded", function() {
  //console.log('Hello')

  // Use the fetch API
  fetch("data.json")
    .then(data => data.json())
    .then(result => {
      speakersTemplate(result.speakers);
      conferenceTemplate(result.conferences);
      addfiltering();
    });

    conferenceTemplate = (conferences) =>{
        const days = Object.keys(conferences).map(days => days)

        days.forEach(day => {
            let element = document.querySelector(`#${day}`);
            conferences[day].forEach( conference => {

                // this creates the dic with the workshop info

                const conferenceDiv= document.createElement('div');
                conferenceDiv.classList.add(`${conference.category}-cat`, 'mix');

                const liContainer= document.createElement('li');
                conferenceDiv.appendChild(liContainer);

                liContainer.classList.add("list-group-item", "list-group-item-action", "d-flex", "conference-wrapper", "align-items-center");
                liContainer.innerHTML = `
                    <div class="image">
                        <img src="img/speaker_${conference.speaker_id}_sq.jpg" class="img-fluid rounded-circle" alt="Speaker 1">
                    </div>
                    <div class="conference-info">
                        <p class="mb-1 time">
                            <span class="badge badge-primary">
                                ${conference.time}
                            </span>
                            ${conference.workshop ? `<span class="badge badge-danger">
                                WORKSHOP
                            </span>` : ``}
                        </p>
                        <p class="mb-1 title"> ${conference.title}</p>
                        <p class="mb-1 description"> ${conference.description}</p>
                        <p class="speaker">By: <span>${conference.speaker}</span>
                        </p>
                    </div>
                `;
                element.appendChild(conferenceDiv);
            })
        })
    };

  speakersTemplate = speakers => {
    const speakerList = document.querySelector(".speaker-list");
    speakers.forEach((speaker, index) => {
      // increase by 1, to matcj the image name
      let id = index + 1;

      // Create the HTML structure
      const speakerHTML = document.createElement("li");

      // Add Classes
      speakerHTML.classList.add("col-sm-6", "col-lg-3");

      // buiild the HTML
      speakerHTML.innerHTML = `
                <div class="speaker-image">
                    <img src="img/speaker_${id}.jpg" alt="" class="img-fluid">
                </div>
                <div class="speaker-info py-3 text-center">
                    <h3 class="text-center text-uppercase">${speaker.name}</h3>
                    <p>${speaker.description}</p>
                </div>
            `;

      speakerList.appendChild(speakerHTML);
    });
  };

    // Smooth Scroll
    const scroll = new SmoothScroll('a[href*="#"]', {
        // Smothscroll options
        speed: 1000,
        updateURL: false,
        
    });
    
    // Fixed the navigation on top
    const navigation = document.querySelector(".main-navigation"),
          siteHeader = document.querySelector('.site-header');

    const fixedNavigation = () =>{
        if (window.innerWidth > 768) {
            window.onscroll = () => {
                if (window.scrollY > siteHeader.clientHeight) {
                    navigation.classList.add('fixed-top');
                    navigation.classList.remove("pt-md-5");
                } else if (window.scrollY === 0) {
                    navigation.classList.remove("fixed-top");
                    navigation.classList.add("pt-md-5");
                }
            }
        } else {
            navigation.classList.remove('fixed-top');
        }
    }

    fixedNavigation();

    window.addEventListener('resize', function(){
        fixedNavigation();
    })

    // Tool Mobile Menu
    const mobileIcon =  document.querySelector('.mobile-menu i');
    mobileIcon.addEventListener('click', function(){
        if(navigation.classList.contains('mobile-active')){
            navigation.classList.remove("d-flex", "mobile-active", "fixed-top");

            return;
        }
        // Display Menu in Mobile devices
        navigation.classList.add('d-flex', 'mobile-active', 'fixed-top')
        
    })

    // Adds filtering
    const addfiltering = ()=>{
        let workshopList = document.querySelector("#workshops");
        mixitup(workshopList);
    }

    // Animation for the numbers

   setTimeout(()=>{
       const conferenceContainer = document.querySelector('#conference-total');
       //element, start number, end number, decimal, duration
       const conferenceAnimation = new CountUp(conferenceContainer, 0, 12, 0, 5);
       conferenceAnimation.start();

       const workshopsContainer = document.querySelector('#workshops-total');
       const workshopsAnimation = new CountUp(workshopsContainer, 0, 04, 0, 10);
       workshopsAnimation.start();

       const daysContainer = document.querySelector('#days-total');
       const daysAnimation = new CountUp(daysContainer, 0, 02, 0, 10);
       daysAnimation.start();
   }, 600)
    
});
