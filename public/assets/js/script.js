/* alert("helllooooooowwwww") */

const escapeXSS = (text) => {
    if (typeof text !== 'string') 
    return text;
    const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
    };

    const questionnaireBody = document.querySelector('.questionnaire-body');

    console.log('tous les filtres', filters);
    console.log('toutes les assos', associations);

    const regions = filters.filter(filter => filter.type === 'region');
    const modeDeTravail = filters.filter(filter => filter.type === 'mode-de-travail');
    const disponibilites = filters.filter(filter => filter.type === 'disponibilite');
    const missions = filters.filter(filter => filter.type === 'mission');

    let etape = 0;
    const filtersSelected = {
    region: null,
    modeDeTravail: null,
    disponibilite: null,
    mission: null
    };

    const questions = [
        {
            title: 'J\'habite dans la région :',
            type: 'region',
            filters: regions
        }, {
            title: 'Je préfère effectuer ma mission :',
            type: 'modeDeTravail',
            filters: modeDeTravail
        }, {
            title: 'Je suis disponible :',
            type: 'disponibilite',
            filters: disponibilites
        }, {
            title: 'Ma mission de mentorat, je l\'imagine :',
            type: 'mission',
            filters: missions
        },
    ];

    const displayQuestion = () => {
        const question = questions[etape];
        const filters = question ? question.filters : [];
        const filtersHTML = filters.map(filter => `<div class="test">
        <button type="button" class="card-contenue flip-scale-up-hor" data-id="${filter.id}">
        ${escapeXSS(filter.text)} <i class="fa-solid fa-signs-post distance"></i>
        </button> </div>`).join('');
        
        const assos = getFilteredAssociations();
        const nbAssos = assos.length;
        
        questionnaireBody.innerHTML = `
        <h3 class="title-question"> ${escapeXSS(question ? question.title : '')}</h3>

        <div class="container-card-button text-erreur">
           ${etape == 0 ? `<p> Hello </p>`: ""}
           ${etape == 1 ? `<p> Bonjour </p>
           <img src="../images/teletravail.jpg" width="100"> 
           <img src="../images/bureau.jpg" width="100">
           `: ""}
            ${
                nbAssos > 0 ? filtersHTML : `<p class="aucune-asso">Aucune association ne correspond à vos critères.</p>`
            }
            ${
                etape > 0 ? '<button type="button" class="btn-retour">Retour</button>' : ''
            }

    console.log('etape', etape);
    console.log('filtersSelected', filtersSelected);
    console.log('nbAssos', nbAssos);
    console.log('assos', assos);

    const btns = questionnaireBody.querySelectorAll('button');
    btns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
    if (btn.textContent === 'Retour') {
        filtersSelected[questions[etape - 1].type] = null;
        etape--;
        removeBar()
        questionnaireBody.setAttribute("id", "slide-"+etape)
    } else {
        const id = parseInt(btn.getAttribute('data-id'));
        filtersSelected[question.type] = id;
        etape++;
        updateBar()
        questionnaireBody.setAttribute("id", "slide-"+etape)
    }

    if (etape > 3) {
        displayResult();
    } else {
        displayQuestion();
    }
    });
    });
    };

    const getFilteredAssociations = () => {
        return associations.filter(asso => {
            if (filtersSelected.region !== null && !asso.filters.includes(filtersSelected.region)) {
                return false;
                }
            if (filtersSelected.modeDeTravail !== null && !asso.filters.includes(filtersSelected.modeDeTravail)) {
                return false;
            }
            if (filtersSelected.disponibilite !== null && !asso.filters.includes(filtersSelected.disponibilite)) {
                return false;
            }
            if (filtersSelected.mission !== null && !asso.filters.includes(filtersSelected.mission)) {
                return false;
            }
                return true;
            });
    };

    const displayResult = () => {
        const assos = getFilteredAssociations();
        
        questionnaireBody.innerHTML = `
        <h3 class="title-question">
            Résultat
        </h3>
        <div class="bg-resultat-asso">
            ${
                assos.map(asso => `
                <div class="name-asso">
                    <div class="card-body">
                        ${escapeXSS(asso.name)}
                    </div>
                </div>
            `).join('')
            }
            ${assos.length === 0 ? '<p class="aucune-asso">Aucune association ne correspond à vos critères.</p>' : ''}
            <button type="button" class="btn-retour">Retour</button>
        </div>
        `;

        questionnaireBody.querySelector('button').addEventListener('click', () => {
        etape--;
        filtersSelected[questions[etape].type] = null;
        displayQuestion();
        });
    };

    displayQuestion();

    {
    const zoneAssos = document.querySelector('#assos');

    const zoneRegions = document.querySelector('.zone-regions');
    const zoneModeDeTravail = document.querySelector('.zone-mode-de-travail');
    const zoneDisponibilites = document.querySelector('.zone-disponibilites');
    const zoneMissions = document.querySelector('.zone-missions');

    const regions = filters.filter(filter => filter.type === 'region');
    const modeDeTravail = filters.filter(filter => filter.type === 'mode-de-travail');
    const disponibilites = filters.filter(filter => filter.type === 'disponibilite');
    const missions = filters.filter(filter => filter.type === 'mission');

    const filtersSelected = {
        regions: [],
        modeDeTravail: [],
        disponibilites: [],
        missions: []
    };

    const escapeXSS = (text) => {
    if (typeof text !== 'string') 
        return text;

    const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
    };
        return text.replace(/[&<>"']/g, m => map[m]);
    };

    const createSelect = (zone, label, type) => {
    zone.innerHTML = `
        <label for="${type}">${label}</label>
        <select name="${type}" id="${type}" multiple>
        ${
            filters.filter(filter => filter.type === type).map(filter => `<option value="${escapeXSS(filter.id)}">
            ${escapeXSS(filter.text)}</option>`).join('')
        }
        </select>
        `;
    };

    createSelect(zoneRegions, 'Région', 'region');
    createSelect(zoneModeDeTravail, 'Mode de travail', 'mode-de-travail');
    createSelect(zoneDisponibilites, 'Disponibilité', 'disponibilite');
    createSelect(zoneMissions, 'Mission', 'mission');

    const displayAssos = () => {
    const assos = associations.filter(asso => {
        if (filtersSelected.regions.length > 0 && !asso.filters.some(filterId => filtersSelected.regions.includes(filterId))) {
            return false;
        }
        if (filtersSelected.modeDeTravail.length > 0 && !asso.filters.some(filterId => filtersSelected.modeDeTravail.includes(filterId))) {
            return false;
        }
        if (filtersSelected.disponibilites.length > 0 && !asso.filters.some(filterId => filtersSelected.disponibilites.includes(filterId))) {
            return false;
        }
        if (filtersSelected.missions.length > 0 && !asso.filters.some(filterId => filtersSelected.missions.includes(filterId))) {
            return false;
        }
        return true;
    });

    zoneAssos.innerHTML = `
        <ul class="tu-sers-a-quo">
            ${
                assos.map(asso => `<li>${
                escapeXSS(asso.name)
                }</li>`).join('')
            }
        </ul>
        `;
    };

    const getSelectValues = (selectElement) => {
        if (!selectElement)
        return [];
        return Array.from(selectElement.selectedOptions).filter(option => option.selected).map(option => parseInt(option.value));
    };

    const createSelectListener = (zone, type) => {
        zone.querySelector('select').addEventListener('change', (event) => {
            const selectedValues = getSelectValues(event.target);
            filtersSelected[type] = selectedValues;
            displayAssos();
    });
    };

    createSelectListener(zoneRegions, 'regions');
    createSelectListener(zoneModeDeTravail, 'modeDeTravail');
    createSelectListener(zoneDisponibilites, 'disponibilites');
    createSelectListener(zoneMissions, 'missions');

    displayAssos();
    }


    
var element = document.getElementById("myprogressBar"); 
var taille = 1;

function updateBar() {
taille++; 
  element.style.width = taille * 25 + '%';
    element.innerHTML = taille  + '/4';
}
function removeBar() {
taille--; 
  element.style.width = taille * 25 + '%';
    element.innerHTML = taille  + '/4';
}
