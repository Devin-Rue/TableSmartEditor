function GuidersTutorials(idtutorial) {
    switch (idtutorial) {
        case "1.1": /* Prima parte guida creazione news*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF",false); GuideInNewPage("1.2", ""); } }
                        ],
                description: "I passaggi che verranno illustrati in questa guida riguarderanno l'inserimento/modifica di una <b>News</b>.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Creazione/Modifica di una news"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", "end", "#FFF", false); GuideInNewPage("1.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile creare una nuova news.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                next: "end",
                position: 6,
                title: "Creare una nuova news"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare una news esistente.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Modifica di una news"
            });

            break;

        case "1.2": /* Seconda parte guida creazione news*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#data", 2, "#FFF", true); } }
                         ],                
                description: "Nel seguente form dati, potrai inserire tutte le informazioni riguardanti la news che si sta creando/modificando: titolo, testo e e caricare un'immagine dal pc.",
                id: "1",
                next: "2",
                overlay: true,
                position: 4,
                title: "Inserimento dei dati"
            }).show();

            guiders.createGuider({
                attachTo: "#data",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 3, "#FFF", false); } }
                ],
                description: "La data viene inserita in automatico. Per modificarla cliccare nella casella di testo e selezionare la data nel calendario",
                id: "2",
                overlay: true,
                next: "3",
                classString: "margintop-input",
                position: 3,
                title: "Modifica la data della news"
            });

            guiders.createGuider({
                attachTo: "#titoloita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#htmltextita_tbl", 4, "#FFF", false); } }
                ],
                description: "Inserisci il titolo della news",
                id: "3",
                overlay: true,
                next: "4",
                classString: "margintop-input",
                position: 3,
                title: "Inserisci il titolo della news"
            });
            guiders.createGuider({
                attachTo: "#htmltextita_tbl",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_pasteword", 5, "", false); } }
                ],
                description: "Inserisci il testo della news.<br/><br/> In questo editor di testo,<b>presente in diverse sezione dell'area riservata</b>, è possibile formattare il testo: inserire il grassetto, corsivo o sottolineato, giustificare il testo oppure caricare un'immagine selezionandola dal proprio pc.",
                id: "4",
                overlay: true,
                next: "5",
                position: 6,
                title: "Inserisci il testo della news"
            });
            guiders.createGuider({
                attachTo: ".mce_pasteword",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_image", 6, "", false); } }
                ],
                description: "Con il pulsante <b>Incolla da Word</b> è possibile incollare un testo copiandolo da Microsoft Word.<br/><br/>Questa operazione consente di inserire il testo <b>eliminando formattazioni</b> di Word inadatte al web, che rallentano la lettura e indicizzazione della pagina.<br/> Per gestire le pagine in maniera ottimale si consiglia di inserire i testi manualmente direttamente nel campo di testo e aggiungere successivamente la formattazione desiderata.",
                id: "5",
                overlay: true,
                next: "6",
                position: 3,
                title: "Incolla da word"
            });
            guiders.createGuider({
                attachTo: ".mce_image",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_link", 8, "", false); } }
                ],
                description: "Carica un'immagine all'interno del testo della news, selezionandola dai <b>file già caricati</b> sul tuo sito web oppure <b>caricare una nuova immagine</b> selezionandola dal tuo pc",
                id: "6",
                overlay: true,
                next: "7",
                position: 9,
                title: "Carica un'immagine"
            });
            //guiders.createGuider({
            //    attachTo: ".mce_pagebreak",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX(".mce_link", 8, "", false); } }
            //    ],
            //    description: "Se la news è presente nella home-page del tuo sito web, inserendo un'interruzione di pagina, il testo verrà suddiviso in due parti: la prima parte verrà visualizzata in home-page, la seconda parte, invece, verrà visualizzata cliccando sul pulsante <em>Leggi Tutto</em>",
            //    id: "7",
            //    overlay: true,
            //    next: "8",
            //    position: 3,
            //    title: "Inserimento di un'interruzione di pagina"
            //});

            guiders.createGuider({
                attachTo: ".mce_link",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_unlink", 9, "", false); } }
                ],
                description: "Per collegare alcune parti del testo ad una pagina web o a un file, selezionare il testo che conterrà il link, cliccare sul pulsante della catenella, nel campo <b>Url collegamento</b> incollare l'indirizzo web da collegare oppure cliccare sull'icona e selezionare il file da collegare.<br/>Definire eventualmente altre proprietà del collegamento e cliccare sul pulsante <b>Inserisci</b>.",
                id: "8",
                overlay: true,
                next: "9",
                position: 9,
                title: "Inserimento di un link"
            });

            guiders.createGuider({
                attachTo: ".mce_unlink",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#immagine,#btnUploadFileImmagineNews", 10, "", false); } }
                ],
                description: "Per eliminare un link presente nel testo della news, selezionare il testo che contiene il link e cliccare sul pulsante della catenella spezzata.",
                id: "9",
                overlay: true,
                next: "10",
                position: 9,
                title: "Eliminare un link"
            });

            guiders.createGuider({
                attachTo: "#btnUploadFileImmagineNews",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#permetticommenti", "11", "", true); } }
                         ],
                description: "Cliccando su questo pulsante potrai caricare un'immagine per la news, selezionandola dal tuo pc.",
                id: "10",
                overlay: true,
                next: "11",
                classString: "margintop-input",
                position: 6,
                title: "Inserimento di un'immagine"
            });

            guiders.createGuider({
                attachTo: "#permetticommenti",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true); } }
                ],
                description: "Selezionando questa casella consenti di inserire dei commenti alla news da parte degli utenti del sito.",
                id: "11",
                overlay: true,
                next: "end",
                classString: "margintop-input",
                position: 3,
                title: "Consentire l'inserimento di commenti"
            });


            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } }
                         ],
                description: "Salva la news creata cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare la creazione della news clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;
        case "2.1": /* Prima parte guida creazione pagina*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF",false); GuideInNewPage("2.2", ""); } }
                        ],
                description: "I passaggi che verranno eseguiti in questa guida riguarderanno l'inserimento/modifica di una <b>pagina</b> del sito.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Creazione/Modifica di una pagina del sito"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", "end", "#FFF", false); GuideInNewPage("2.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile creare una nuova pagina.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                next: "end",
                position: 6,
                title: "Creare una nuova pagina"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare una pagina esistente.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "end",
                overlay: true,
                classString: "margintop-input",                
                position: 3,
                title: "Modifica di una pagina del sito"
            });
            break;

        case "2.2": /* Seconda parte guida creazione pagina*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#tipopagina", 2, "#FFF", false); } }
                         ],
                description: "Nel seguente form dati, potrai inserire tutte le informazioni riguardanti la pagina che si sta creando/modificando: titolo, testo e definire i tag title e descrizione per l'indicizzazione della pagina sui motori di ricerca.",
                id: "1",
                next: "2",
                overlay: true,
                position: 3,
                title: "Inserimento dati"
            }).show();
            
//            guiders.createGuider({
//                attachTo: "#primapagina",
//                buttons: [
//                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
//                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 3, "#FFF", true); } }
//                         ],
//                description: "Attivando questo flag potrai inserire la pagina nella home-page del sito.",
//                id: "2",
//                overlay: true,
//                classString: "margintop-input",
//                next: "3",                
//                position: 3,
//                title: "Prima Pagina"
            //            });

            guiders.createGuider({
                attachTo: "#tipopagina",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 3, "#FFF", true); } }
                         ],
                description: "Se la pagina avrà una struttura preimpostata (ad es. conterrà il form dei contatti) selezionare il relativo tipo della pagina dall'elenco, altrimenti lasciare questo campo vuoto.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",                
                position: 3,
                title: "Indicazione tipo pagina"
            });

            guiders.createGuider({
                attachTo: "#titoloita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#htmltextita_tbl", 4, "#FFF", false); } }
                         ],
                description: "Inserisci il titolo da visualizzare nella nuova pagina",
                id: "3",
                overlay: true,
                next: "4",
                classString: "margintop-input",
                position: 3,
                title: "Inserisci il titolo della pagina"
            });
            guiders.createGuider({
                attachTo: "#htmltextita_tbl",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_pasteword", 5, "", false); } }
                         ],
                description: "Inserisci il testo della pagina.<br/><br/> In questo editor di testo,<b>presente in diverse sezione dell'area riservata</b>, è possibile formattare il testo: inserire il grassetto, corsivo o sottolineato, giustificare il testo oppure caricare un'immagine selezionandola dal proprio pc.",
                id: "4",
                overlay: true,
                next: "5",
                position: 6,
                title: "Inserisci il testo della pagina"
            });
            guiders.createGuider({
                attachTo: ".mce_pasteword",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_image", 6, "", false); } }
                         ],
                description: "Con il pulsante <b>Incolla da Word</b> è possibile incollare un testo copiandolo da Microsoft Word.<br/><br/>Questa operazione consente di inserire il testo <b>eliminando formattazioni</b> di Word inadatte al web, che rallentano la lettura e indicizzazione della pagina.<br/> Per gestire le pagine in maniera ottimale si consiglia di inserire i testi manualmente direttamente nel campo di testo e aggiungere successivamente la formattazione desiderata.",
                id: "5",
                overlay: true,
                next: "6",
                position: 3,
                title: "Incolla da word"
            });
            guiders.createGuider({
                attachTo: ".mce_image",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_pagebreak", 7, "", false); } }
                         ],
                description: "Carica un'immagine all'interno della pagina, selezionandola dai <b>file già caricati</b> sul tuo sito web oppure <b>caricare una nuova immagine</b> selezionandola dal tuo pc",
                id: "6",
                overlay: true,
                next: "7",
                position: 9,
                title: "Carica un'immagine"
            });
            guiders.createGuider({
                attachTo: ".mce_pagebreak",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_link", 8, "", false); } }
                         ],
                description: "Se la pagina è presente nella home-page del tuo sito web, inserendo un'interruzione di pagina, il testo verrà suddiviso in due parti: la prima parte verrà visualizzata in home-page, la seconda parte, invece, verrà visualizzata cliccando sul pulsante <em>Leggi Tutto</em>",
                id: "7",
                overlay: true,
                next: "8",
                position: 3,
                title: "Inserimento di un'interruzione di pagina"
            });

            guiders.createGuider({
                attachTo: ".mce_link",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".mce_unlink", 9, "", false); } }
                         ],
                description: "Per collegare alcune parti del testo ad una pagina web o a un file, selezionare il testo che conterrà il link, cliccare sul pulsante della catenella, nel campo <b>Url collegamento</b> incollare l'indirizzo web da collegare oppure cliccare sull'icona e selezionare il file da collegare.<br/>Definire eventualmente altre proprietà del collegamento e cliccare sul pulsante <b>Inserisci</b>.",
                id: "8",
                overlay: true,
                next: "9",
                position: 9,
                title: "Inserimento di un link"
            });

            guiders.createGuider({
                attachTo: ".mce_unlink",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#cartellaimmagini,#btnCreateFoldercartellaimmaginipagine", 11, "", false); } }
                         ],
                description: "Per eliminare un link presente nel testo della pagina, selezionare il testo che contiene il link e cliccare sul pulsante della catenella spezzata.",
                id: "9",
                overlay: true,
                next: "13",
                position: 9,
                title: "Eliminare un link"
            });
                        

//            guiders.createGuider({
//                attachTo: "#titololateraleita",
//                buttons: [
//                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
//                            { name: "Continua", onclick: function () { highlightBOX("#htmllateraleita_tbl", 9, "#FFF", true); } }
//                         ],
//                description: "Inserisci il titolo laterale della pagina.",
//                id: "8",
//                overlay: true,
//                next: "9",
//                classString: "margintop-input",
//                position: 3,
//                title: "Inserisci il titolo laterale della pagina"
            //            });
//            guiders.createGuider({
//                attachTo: "#htmllateraleita_tbl",
//                buttons: [
//                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
//                            { name: "Continua", onclick: function () { highlightBOX("#tagtitleita", 10, "#FFF", true); } }
//                         ],
//                description: "Inserisci il testo laterale della pagina, che viene visualizzato nella parte laterale della pagina.",
//                id: "9",
//                overlay: true,
//                next: "10",

//                position: 3,
//                title: "Inserisci il testo laterale della pagina"
//            });
            
            //guiders.createGuider({
            //    attachTo: "#htmllateraleita_tbl",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#cartellaimmagini,#btnCreateFoldercartellaimmaginipagine", 11, "", false); } }
            //             ],
            //    description: "Inserisci il testo che affianca la galleria delle immagini presente nella pagina web.",
            //    id: "10",
            //    overlay: true,
            //    next: "11",
            //    position: 12,
            //    title: "Inserisci il testo che affianca la galleria delle immagini"
            //});

            guiders.createGuider({
                attachTo: "#cartellaimmagini,#btnCreateFoldercartellaimmaginipagine",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#tagtitleita", 13, "#FFF", false); } }
                         ],
                description: "Inserisci il <b>nome della cartella</b> che conterrà le immagini visualizzate nella galleria della pagina e clicca sul <b>pulsante</b> per effettuare l'upload delle immagini.",
                id: "11",
                overlay: true,
                next: "12",
                position: 1,
                title: "Inserisci la galleria delle immagini"
            });

            //guiders.createGuider({
            //    attachTo: "#coloresfondo",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#tagtitleita", 13, "#FFF", false); } }
            //             ],
            //    description: "Per impostare un colore di sfondo al testo differente dal colore di default, seleziona il colore tra quelli disponibili.",
            //    id: "12",
            //    overlay: true,
            //    next: "13",
            //    position: 3,
            //    title: "Imposta un colore di sfondo al testo della pagina"
            //});

            guiders.createGuider({
                attachTo: "#tagtitleita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#tagdescrizioneita", 14, "#FFF", false); } }
                         ],
                description: "Inserisci il tag title per la nuova pagina. Il tag title è il testo che appare nella fascia in alto dei browser e appare nei risultati dei motori di ricerca.",
                id: "13",
                overlay: true,
                next: "14",
                classString: "margintop-input",
                position: 3,
                title: "Inserisci il tag title relativo alla pagina"
            });
            guiders.createGuider({
                attachTo: "#tagdescrizioneita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "#FFF", true); } }
                         ],
                description: "Inserisci il tag descrizione per la nuova pagina. Il tag descrizione è una breve descrizione dei contenuti della pagina e appare nei risultati dei motori di ricerca. Hai a disposizione 150 caratteri.",
                id: "14",
                overlay: true,
                next: "end",
                classString: "margintop-input",
                position: 3,
                title: "Inserisci il tag descrizione relativo alla pagina"
            });

//            guiders.createGuider({
//                attachTo: "#ordinamento",
//                buttons: [
//                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
//                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true); } }
//                         ],
//                description: "Permette di definire l'ordinamento della pagine in Home-Page se e selezionata la voce PrimaPagina",
//                id: "12",
//                overlay: true,
//                classString: "margintop-input",
//                next: "end",                
//                position: 3,
//                title: "Ordinamento della pagina"
//            });


            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, "", false); } }
                         ],
                description: "Salva la pagina creata cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare le modifiche clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;
        case "3.1": /* Prima parte guida creazione menu*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF", false); GuideInNewPage("3.2", ""); } }
                        ],
                description: "I passaggi che verranno eseguiti in questa guida riguarderanno l'inserimento/modifica delle <b>voci di menù</b>.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Inserimento/Modifica di una voce di menù"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", 3, "#FFF", false); GuideInNewPage("3.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile inserire una nuova voce di menù.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Inserimento di una voce di menù"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare una voce di menù esistente.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "3",
                overlay: true,
                classString: "margintop-input",
                next: "4",
                position: 3,
                title: "Modifica di una voce di menù"
            });

            break;

        case "3.2": /* Seconda parte guida creazione menu*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 2, "#FFF", true); } }
                         ],
                description: "Nel seguente form dati, potrai indicare tutte le informazioni riguardanti la voce di <b>menù</b> che si sta inserendo/modificando: titolo, link della voce di menù e definire l'ordinamento.",
                id: "1",
                next: "2",
                overlay: true,
                position: 3,
                title: "Inserimento/Modifica dei dati"
            }).show();

            guiders.createGuider({
                attachTo: "#titoloita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneLinkPagina,#Descr_linkpagina", 3, "", true); } }
                         ],
                description: "Inserisci il titolo del menù che verrà visualizzato nella barra dedicata.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Titolo della voce di menù principale"
            });

            guiders.createGuider({
                attachTo: "#btnSelezioneLinkPagina",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#linkurlpersonalizzatoita", 4, "#FFF", true); } }
                         ],
                description: "Il seguente pulsante indica la presenza di un <b>campo collegato</b>.<br /><br />Clicca sul pulsante e seleziona la pagina da collegare tramite il link <b>Inserisci</b>, oppure digita all'interno del campo di testo le prime lettere del titolo della pagina che vuoi collegare, ti verrà suggerito il valore e potrai inserirlo velocemente.",
                id: "3",
                overlay: true,
                next: "4",
                classString: "margintop",
                position: 6,
                title: "Collega il menù ad una pagina del tuo sito"
            });
            guiders.createGuider({
                attachTo: "#linkurlpersonalizzatoita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#ordinamento", 5, "#FFF", true); } }
                         ],
                description: "Puoi collegare la voce di menù ad una pagina esterna al sito, inserendo l'url. Esempio: http://www.xxx.it",
                id: "4",
                overlay: true,
                next: "5",
                classString: "margintop-input",
                position: 3,
                title: "Collega il menù ad una pagina esterna al sito"
            });

            guiders.createGuider({
                attachTo: "#ordinamento",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare", 6, "#FFF", true); } }
                         ],
                description: "Inserisci la posizione della voce di menù rispetto alle altre.",
                id: "5",
                overlay: true,
                next: "6",
                classString: "margintop-input",
                position: 3,
                title: "Ordina le tue voci di menù"
            });
            guiders.createGuider({
                attachTo: "#nonvisualizzare",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#DetailTable", 7, "#", true) } }
                         ],
                description: "Puoi decidere di nascondere la voce di menù, e di visualizzarla in un secondo momento",
                id: "6",
                overlay: true,
                next: "7",
                classString: "margintop-input",
                position: 3,
                title: "Nascondi la voce di menù"
            });
            guiders.createGuider({
                attachTo: "#DetailTable",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true); } }
                         ],
                description: "Puoi collegare alla voce di menù principale, delle voci sotto menù.<br/>Cliccando su <b>Nuovo</b> potrai inserire una nuova voce di sotto menù, oppure cliccando su <b>Modifica</b>, puoi cambiare una voce già esistente.",
                id: "7",
                overlay: true,
                next: "end",
                position: 12,
                title: "Collega le voci di sotto menù"
            });                     


            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } }
                         ],
                description: "Salva la voce di menù creata cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare la creazione della voce di menu clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;

        case "4.1": /* Prima parte guida creazione boxcolonna*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF", false); GuideInNewPage("4.2", ""); } }
                        ],
                description: "I passaggi che verranno eseguiti in questa guida riguarderanno l'inserimento/modifica dei <b>box</b> presenti nella colonna laterale del sito.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Inserimento/Modifica dei box laterali"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", 3, "#FFF", false); GuideInNewPage("4.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile inserire un nuovo box.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Inserimento di un nuovo box"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare un box esistente.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "3",
                overlay: true,
                classString: "margintop-input",
                next: "4",
                position: 3,
                title: "Modifica di un box"
            });

            break;

        case "4.2": /* Seconda parte guida creazione boxcolonna*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnUploadFileImmagineBoxColonna", 3, "#FFF", true); } }
                         ],
                description: "Nel seguente form dati, potrai indicare tutte le informazioni riguardanti il <b>box</b> che si sta inserendo/modificando: immagine, link, ordinamento...",
                id: "1",
                next: "3",
                overlay: true,
                position: 3,
                title: "Inserimento/Modifica dei dati"
            }).show();

            //guiders.createGuider({
            //    attachTo: "#titoloita",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#btnUploadFileImmagineBoxColonna", 3, "", true); } }
            //             ],
            //    description: "Inserisci il titolo del box.",
            //    id: "2",
            //    overlay: true,
            //    classString: "margintop-input",
            //    next: "3",
            //    position: 3,
            //    title: "Titolo del box"
            //});

            guiders.createGuider({
                attachTo: "#btnUploadFileImmagineBoxColonna",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneLinkPagina,#Descr_linkpagina", 4, "#FFF", true); } }
                         ],
                description: "Il seguente pulsante permette di effettuare l'<b>upload</b> di un'immagine.<br /><br />Clicca sul pulsante e seleziona il file da caricare ritagliandolo/ridimensionandolo in base alle dimensioni indicate.<br/>Clicca su <b>salva</b> e in seguito su <b>Inserisci e chiudi</b>.",
                id: "3",
                overlay: true,
                next: "4",
                classString: "margintop",
                position: 6,
                title: "Upload di un'immagine"
            });

            guiders.createGuider({
                attachTo: "#btnSelezioneLinkPagina",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneLinkNews,#Descr_linknews", 5, "#FFF", true); } }
                         ],
                description: "Il seguente pulsante indica la presenza di un <b>campo collegato</b>.<br /><br />Clicca sul pulsante e seleziona la pagina da collegare tramite il link <b>Inserisci</b>, oppure digita all'interno del campo di testo le prime lettere del titolo della pagina che vuoi collegare, ti verrà suggerito il valore e potrai inserirlo velocemente.",
                id: "4",
                overlay: true,
                next: "5",
                classString: "margintop",
                position: 6,
                title: "Collega il box ad una pagina del tuo sito"
            });

            guiders.createGuider({
                attachTo: "#btnSelezioneLinkNews",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#linkurlpersonalizzatoita", 6, "#FFF", true); } }
                ],
                description: "Clicca sul pulsante e seleziona la news da collegare tramite il link <b>Inserisci</b>, oppure digita all'interno del campo di testo le prime lettere del titolo della news che vuoi collegare, ti verrà suggerito il valore e potrai inserirlo velocemente.",
                id: "5",
                overlay: true,
                next: "6",
                classString: "margintop",
                position: 6,
                title: "Collega il box ad una news del tuo sito"
            });

            guiders.createGuider({
                attachTo: "#linkurlpersonalizzatoita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#ordinamento", 7, "#FFF", true); } }
                         ],
                description: "Puoi collegare il box ad una pagina esterna al sito, inserendo l'url. Esempio: http://www.xxx.it",
                id: "6",
                overlay: true,
                next: "7",
                classString: "margintop-input",
                position: 3,
                title: "Collega il box ad una pagina esterna al sito"
            });

            guiders.createGuider({
                attachTo: "#ordinamento",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare", 11, "#FFF", true); } }
                         ],
                description: "Inserisci la posizione del box rispetto agli altri.",
                id: "7",
                overlay: true,
                next: "11",
                classString: "margintop-input",
                position: 3,
                title: "Ordina i tuoi box"
            });

            //guiders.createGuider({
            //    attachTo: "#colonnadestra",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#solohome", 9, "", false) } }
            //    ],
            //    description: "Seleziona la casella se vuoi visualizzare il box nella colonna destra del sito",
            //    id: "8",
            //    overlay: true,
            //    next: "9",
            //    classString: "margintop-input",
            //    position: 3,
            //    title: "Visualizza il box nella colonna destra"
            //});

            //guiders.createGuider({
            //    attachTo: "#solohome",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#solopaginainterna", 10, "", false) } }
            //             ],
            //    description: "Seleziona la casella se vuoi visualizzare il box solo nella home page",
            //    id: "9",
            //    overlay: true,
            //    next: "10",
            //    classString: "margintop-input",
            //    position: 3,
            //    title: "Visualizza il box solo in home page"
            //});

            //guiders.createGuider({
            //    attachTo: "#solopaginainterna",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare",11, "", false) } }
            //             ],
            //    description: "Seleziona la casella se vuoi visulizzarare il box solo nelle pagine interne",
            //    id: "10",
            //    overlay: true,
            //    next: "11",
            //    classString: "margintop-input",
            //    position: 3,
            //    title: "Visualizza il box solo nelle pagine interne"
            //});

            guiders.createGuider({
                attachTo: "#nonvisualizzare",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true) } }
                         ],
                description: "Puoi decidere di nascondere il box, e di visualizzarlo in un secondo momento",
                id: "11",
                overlay: true,
                next: "end",
                classString: "margintop-input",
                position: 3,
                title: "Nascondi il box"
            });
          
            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } }
                         ],
                description: "Salva il box creato cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare la creazione del box clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;

        case "5.1": /* Prima parte guida creazione Slideshowimmagini*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF", false); GuideInNewPage("5.2", ""); } }
                        ],
                description: "I passaggi che verranno eseguiti in questa guida riguarderanno l'inserimento/modifica della <b>galleria delle immagini</b> presente in home page.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Inserimento/Modifica della galleria delle immagini in home page"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", 3, "#FFF", false); GuideInNewPage("5.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile inserire una nuova immagine.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Inserimento di una nuova immagine"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare un'immagine inserita.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "3",
                overlay: true,
                classString: "margintop-input",
                next: "4",
                position: 3,
                title: "Modifica di un'immagine"
            });

            break;

        case "5.2": /* Seconda parte guida creazione Imgslider*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 2, "#FFF", false); } }
                         ],
                description: "Nel seguente form dati, potrai indicare tutte le informazioni riguardanti la <b>galleria delle immagini</b> presenti in home page.",
                id: "1",
                next: "2",
                overlay: true,
                position: 3,
                title: "Inserimento/Modifica delle immagini"
            }).show();

            guiders.createGuider({
                attachTo: "#titoloita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#sottotitoloita_tbl", 3, "", true); } }
                         ],
                description: "Inserisci il testo da visualizzare insieme all'immagine.",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Titolo immagine"
            });

            guiders.createGuider({
                attachTo: "#sottotitoloita_tbl",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneLinkPagina,#Descr_linkpagina", 4, "", true); } }
                ],
                description: "Inserisci il sottotitolo da associare all'immagine.",
                id: "3",
                overlay: true,
                classString: "margintop-input",
                next: "4",
                position:6,
                title: "Sottotitolo immagine"
            });
            
            guiders.createGuider({
                attachTo: "#btnSelezioneLinkPagina",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneLinkNews,#Desc_linknews", 5, "#FFF", false); } }
                         ],
                description: "Il seguente pulsante indica la presenza di un <b>campo collegato</b>.<br /><br />Clicca sul pulsante e seleziona la pagina da collegare tramite il link <b>Inserisci</b>, oppure digita all'interno del campo di testo le prime lettere del titolo della pagina che vuoi collegare, ti verrà suggerito il valore e potrai inserirlo velocemente.",
                id: "4",
                overlay: true,
                next: "5",
                classString: "margintop",
                position: 6,
                title: "Collega l'immagine ad una pagina del tuo sito"
            });

            guiders.createGuider({
                attachTo: "#btnSelezioneLinkNews",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#linkurlpersonalizzatoita", 6, "#FFF", true); } }
                ],
                description: "Clicca sul pulsante e seleziona la news da collegare tramite il link <b>Inserisci</b>, oppure digita all'interno del campo di testo le prime lettere del titolo della news che vuoi collegare, ti verrà suggerito il valore e potrai inserirlo velocemente.",
                id: "5",
                overlay: true,
                next: "6",
                classString: "margintop",
                position: 6,
                title: "Collega l'immagine ad una news del tuo sito"
            });

            guiders.createGuider({
                attachTo: "#linkurlpersonalizzatoita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnUploadFileImmagineSlideshowImmagini,#immagine", 7, "#FFF", false); } }
                         ],
                description: "Puoi collegare l'immagine ad una pagina esterna al sito, inserendo l'url. Esempio: http://www.xxx.it",
                id: "6",
                overlay: true,
                next: "7",
                classString: "margintop-input",
                position: 3,
                title: "Collega l'immagine ad una pagina esterna al sito"
            });

            guiders.createGuider({
                attachTo: "#btnUploadFileImmagineSlideshowImmagini",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#ordinamento", 8, "#FFF", false); } }
                         ],
                description: "Il seguente pulsante permette di effettuare l'<b>upload</b> di un'immagine.<br /><br />Clicca sul pulsante e seleziona il file da caricare ritagliandolo/ridimensionandolo in base alle dimensioni indicate.<br/>Clicca su <b>salva</b> e in seguito su <b>Inserisci e chiudi</b>.",
                id: "7",
                overlay: true,
                next: "8",
                classString: "margintop",
                position: 6,
                title: "Upload di un'immagine"
            });

            guiders.createGuider({
                attachTo: "#ordinamento",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare", 9, "#FFF", true); } }
                         ],
                description: "Inserisci la posizione dell'immagine rispetto alle altre.",
                id: "8",
                overlay: true,
                next: "9",
                classString: "margintop-input",
                position: 3,
                title: "Ordina le tue immagini"
            });
         
            guiders.createGuider({
                attachTo: "#nonvisualizzare",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true) } }
                         ],
                description: "Puoi decidere di nascondere l'immagine, e di visualizzarla in un secondo momento",
                id: "9",
                overlay: true,
                next: "end",
                classString: "margintop-input",
                position: 3,
                title: "Nascondi l'immagine"
            });

            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } }
                         ],
                description: "Salva le informazioni inserite cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare la modifiche clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;

        case "6.1": /* Prima parte guida creazione prodotto*/
            guiders.createGuider({
                buttons: [
                          { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                          { name: "Inizia", onclick: function () { highlightBOX("#PanelAddNewButton", 2, "#FFF", false); GuideInNewPage("6.2", ""); } }
                        ],
                description: "I passaggi che verranno eseguiti in questa guida riguarderanno l'inserimento/modifica di una <b>prodotto</b> del sito.<br /><br />",
                id: "1",
                next: "2",
                overlay: true,
                title: "Creazione/Modifica di un prodotto del sito"
            }).show();

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", "end", "#FFF", false); GuideInNewPage("6.2", ""); } }
                         ],
                description: "Tramite il link <b>Nuovo</b> è possibile aggiungere un nuovo prodotto.<br /><br />Clicca su <b>Nuovo</b> per procedere.",
                id: "2",
                overlay: true,
                next: "end",
                position: 6,
                title: "Inserimento di un nuovo prodotto"
            });

            guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare un prodotto esistente.<br /><br />Clicca su <b>Modifica</b> per procedere.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Modifica di un prodotto"
            });
            break;

        case "6.2": /* Seconda parte guida creazione prodotto*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnSelezioneCodCat,#Descr_codcat", 2, "", false); } }
                         ],
                description: "Nel seguente form dati, potrai inserire tutte le informazioni riguardanti il prodotto che si sta creando/modificando: titolo, descrizione, immagini...",
                id: "1",
                next: "2",
                overlay: true,
                position: 3,
                title: "Inserimento dati"
            }).show();

            guiders.createGuider({
                attachTo: "#btnSelezioneCodCat,#Descr_codcat",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#titoloita", 4, "", true); } }
                         ],
                description: "Il seguente pulsante indica la presenza di un <b>campo collegato</b>.<br /><br />Clicca sul pulsante e seleziona la <b>categoria</b> di appartenza del prodotto cliccando sul pulsante <b>Inserisci</b>, oppure digita all'interno del campo di testo il nome della categoria, ti verrà suggerito il valore e potrai inserirlo velocemente.<br/><br/><b>N.B. Se stai modificando la categoria di un prodotto già salvato dovrai effetture nuovamente l'upload delle immagini oppure puoi spostarle nella cartella della relativa categoria tramite la sezione Strumenti - Gestione file</b>",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "4",
                position: 6,
                title: "Indicare la categoria"
            });

            //guiders.createGuider({
            //    attachTo: "#btnSelezioneMarca,#Descr_marca",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#titoloita", 4, "#fff", false); } }
            //             ],
            //    description: "Clicca sul pulsante e seleziona la <b>marca</b> di appartenza del prodotto cliccando sul pulsante <b>Inserisci</b>, oppure digita all'interno del campo di testo il nome della marca.",
            //    id: "3",
            //    overlay: true,
            //    next: "4",
            //    classString: "margintop-input",
            //    position: 6,
            //    title: "Indicare la marca"
            //});
            guiders.createGuider({
                attachTo: "#titoloita",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#descrizioneita_tbl", 5, "#fff", false); } }
                         ],
                description: "Inserisci il nome del prodotto.",
                id: "4",
                overlay: true,
                next: "5",
                position: 3,
                title: "Inserisci il nome del prodotto"
            });
            guiders.createGuider({
                attachTo: "#descrizioneita_tbl",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#btnUploadFileImmagineProdotti", 7, "#fff", false); } }
                         ],
                description: "Inserisci la descrizione del prodotto.<br/><br/> In questo editor di testo,<b>presente in diverse sezione dell'area riservata</b>, è possibile formattare il testo.",
                id: "5",
                overlay: true,
                next: "6",
                position: 6,
                title: "Inserisci la descrizione del prodotto"
            });
            //guiders.createGuider({
            //    attachTo: "#prezzo",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#btnUploadFileImmagineProdotti", 7, "", false); } }
            //             ],
            //    description: "Indicare il prezzo in €",
            //    id: "6",
            //    overlay: true,
            //    next: "7",
            //    position: 3,
            //    title: "Inserisci il prezzo"
            //});
            guiders.createGuider({
                attachTo: "#btnUploadFileImmagineProdotti",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#cartellaimmagini,#btnCreateFoldercartellaimmaginiprodotti", 8, "", false); } }
                         ],
                description: "Per caricare l'immagine del prodotto, clicca sul pulsante e seleziona il file ritagliandolo/ridimensionandolo in base alle dimensioni indicate.<br/>Clicca su <b>salva</b> e in seguito su <b>Inserisci e chiudi</b>.",
                id: "7",
                overlay: true,
                next: "8",
                position: 12,
                title: "Carica l'immagine del prodotto"
            });
            guiders.createGuider({
                attachTo: "#cartellaimmagini,#btnCreateFoldercartellaimmaginiprodotti",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare", 10, "", false); } }
                         ],
                description: "Inserisci il nome della cartella e clicca sul pulsante. Effettua l'upload delle immagini e clicca su <b>Chiudi</b>.",
                id: "8",
                overlay: true,
                next: "9",
                position: 12,
                title: "Carica la cartella delle immagini del prodotto"
            });

            //guiders.createGuider({
            //    attachTo: "#inevidenza",
            //    buttons: [
            //                { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { highlightBOX("#nonvisualizzare", 10, "", false); } }
            //             ],
            //    description: "Selezionare questa casella per visualizzare il prodotto nella relativa sezione in Home Page.",
            //    id: "9",
            //    overlay: true,
            //    next: "10",
            //    position: 3,
            //    title: "Prodotto in evidenza"
            //});

            guiders.createGuider({
                attachTo: "#nonvisualizzare",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true); } }
                         ],
                description: "Puoi decidere di non rendere visibile il prodotto, e di visualizzarlo in un secondo momento",
                id: "10",
                overlay: true,
                next: "end",
                position: 3,
                title: "Nascondere un prodotto"
            });


            
            //            guiders.createGuider({
            //                attachTo: "#ordinamento",
            //                buttons: [
            //                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "", true); } }
            //                         ],
            //                description: "Permette di definire l'ordinamento della pagine in Home-Page se e selezionata la voce PrimaPagina",
            //                id: "12",
            //                overlay: true,
            //                classString: "margintop-input",
            //                next: "end",                
            //                position: 3,
            //                title: "Ordinamento della pagina"
            //            });


            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, "", false); } }
                         ],
                description: "Salva il prodotto cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare le modifiche clicca sul pulsante <b>Annulla</b>.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;
        
        case "15": /* Prima parte guida file manager*/
            guiders.createGuider({
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#upload", 2, "#DDD"); } }
                         ],
                description: "In questa sezione, è possibile gestire i file del tuo sito web. Puoi creare nuove cartelle, caricare nuovi file e rinominarli, gestire la Galleria Fotografica e i file degli utenti.",
                id: "1",
                next: "2",
                overlay: true,
                position: 3,
                title: "Gestione File Manager"
            }).show();

            guiders.createGuider({
                attachTo: "#upload",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#nuovacartella", 3, "#DDD", true); } }
                         ],
                description: "Carica nuovi file",
                id: "2",
                overlay: true,
                classString: "margintop-input",
                next: "3",
                position: 3,
                title: "Upload file"
            });

            guiders.createGuider({
                attachTo: "#nuovacartella",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#aggiorna", 4, "#DDD", true); } }
                         ],
                description: "Inserisci l'indirizzo email di riferimento del cliente.",
                id: "3",
                overlay: true,
                next: "4",
                classString: "margintop-input",
                position: 3,
                title: "Crea una nuova cartella"
            });
            guiders.createGuider({
                attachTo: "#aggiorna",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Btn", "end", "#FFF", true); } }
                         ],
                description: "Inserisci la password da associare al cliente.",
                id: "4",
                overlay: true,
                next: "end",
                position: 3,
                classString: "margintop-input",
                title: "Aggiorna la pagina"
            });



            guiders.createGuider({
                attachTo: "#Btn",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } }
                         ],
                description: "Salva cliccando sul pulsante <b>Salva</b> oppure, se desideri annullare la creazione del cliente clicca sul pulsante <b>Annulla</b>.<br/><br/>Dopo avere salvato il nuovo inserimento, dovrà cliccare sulla voce <b>Genera cartella</b> per generare la cartella dei file e, se è stata inserito un indirizzo email, inviare una email al cliente con le credenziali per accedere all'area clienti.",
                id: "end",
                overlay: true,
                classString: "margintop-input",
                position: 3,
                title: "Salva e Annulla"
            });

            break;

        case "0": /* Guida Home primo accesso*/

            guiders.createGuider({
                buttons: [{ name: "Salta la guida", onclick: guiders.hideAll },
                        { name: "Scopri l'area riservata", onclick: function () { apriTab(0, 2, 2, "#accordion"); } }],
                description: "Tramite l'area riservata potrai gestire e personalizzare il tuo sito web secondo le tue esigenze.",
                id: "1",
                next: "2",
                overlay: true,
                title: "Benvenuto nella tua area riservata!"
            }).show();
            /* .show() means that this guider will get shown immediately after creation. */

            guiders.createGuider({
                attachTo: "#accordion",
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                  { name: "Continua", onclick: function () { apriTab(2, 0, 3, "#ui-accordion-accordion-header-0,#tabs-0"); } }],
                description: "Naviga nelle varie sezioni della tua area riservata tramite il <b>menù principale</b>. Ogni sezione contiene le voci utili alla gestione dei contenuti o delle impostazioni del tuo sito web.",
                id: "2",
                overlay: true,
                next: "3",
                position: 3,
                title: "Menù rapido e ben organizzato"
            });

            guiders.createGuider({
                attachTo: "#tabs-0",
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                  { name: "Continua", onclick: function () { apriTab(0, 1, 4, "#ui-accordion-accordion-header-1,#tabs-1") } }],
                description: "Tramite questa sezione puoi configurare le <b>credenziali d'accesso</b> all'area riservata, definire le <b>email</b> di riferimento del sito web, inserire le informazioni utili per l'<b>indicizzazione del tuo sito web sui motori di ricerca</b> e inserire i dati relativi alla tua azienda che saranno visualizzati in <b>fondo alle pagine</b> dei tuo sito.",
                overlay: true,
                id: "3",
                next: "4",
                position: 3,
                title: "Configurazioni iniziali del tuo sito web"
            });

            guiders.createGuider({
                attachTo: "#tabs-1",
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                  { name: "Continua", onclick: function () { apriTab(1, 2, 5, "#ui-accordion-accordion-header-2,#tabs-2") } }],
                description: "Tramite questa sezione potrai definire i contenuti del tuo sito: <b>box</b> contenenti testo o immagini, testo di <b>email personalizzate</b>, voci di <b>menù</b>, <b>pagine</b>, ....",
                overlay: true,
                id: "4",
                next: "5",
                position: 3,
                title: "Gestione dei contenuti"
            });

            guiders.createGuider({
                attachTo: "#tabs-2",
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                  { name: "Continua", onclick: function () { apriTab(2, 3, 6, "#ui-accordion-accordion-header-3,#tabs-3") } }],
                description: "Aggiungi o modifica <b>categorie</b> di prodotti e <b>prodotti</b>.",
                id: "5",
                overlay: true,
                next: "6",
                position: 3,
                title: "Gestione dei tuoi prodotti"
            });


            //            guiders.createGuider({
            //                attachTo: "#tabs-4",
            //                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                { name: "Continua", onclick: function () { apriTab(4, 5, 8, "#ui-accordion-accordion-header-5,#tabs-5") } }],
            //                description: "Invia newsletter periodiche ai tuoi clienti, inserendo le tue <b>news</b>, oppure inserendo le notizie selezionate dal team IPSOA",
            //                id: "7",
            //                overlay: true,
            //                next: "8",
            //                position: 3,
            //                title: "Resta in contatto con i tuoi clienti"
            //            });
            //         

            //            guiders.createGuider({
            //                attachTo: "#tabs-5",
            //                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
            //                  { name: "Continua", onclick: function () { apriTab(5, 6, 9, "#ui-accordion-accordion-header-6,#tabs-6") } }],
            //                description: "Inserisci nuovi <b>video</b> o <b>foto</b> da condividere con i tuoi clienti.",
            //                id: "8",
            //                overlay: true,
            //                next: "9",
            //                position: 3,
            //                title: "Carica video e fotografie"
            //            });

            guiders.createGuider({
                attachTo: "#tabs-3",
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(false, ""); } },
                  { name: "Continua", onclick: function () { apriTab(3, 2, null, ""); highlightBOX("#log", "7", "#FFF", true) } }],
                description: "Tramite questa sezione potrai modificare le <b>impostazioni</b> dell'area riservata o del tuo sito web, <b>gestire i file</b> e le cartelle che hai caricato sul tuo sito e visualizzare le <b>statistiche</b> su come i visitatori utilizzano il tuo sito.",
                id: "6",
                overlay: true,
                next: "7",
                position: 3,
                title: "Strumenti per la gestione dell'area riservata e del sito web"
            });



            guiders.createGuider({
                attachTo: "#log",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { guidersNext(8); } }
                         ],
                description: "Per ogni sezione dell'area riservata è presente una <b>guida interattiva</b> che ti seguirà passo passo nell'operazione che vuoi effettuare.",
                classString: "logGuiders",
                overlay: true,
                id: "7",
                next: "8",
                position: 5,
                title: "Supporto semplice e veloce"
            });

            guiders.createGuider({
                buttons: [{ name: "Chiudi", onclick: function () { } },
                          { name: "Continua", onclick: function () { highlightBOX("#PanelAddNewButton", "9", "#FFF", true) } }
                         ],

                description: "",
                overlay: true,
                id: "8",
                next: "9",
                position: "center",
                title: "Operazioni sulle tabelle",
                description: "La maggioranza delle tabelle permette di effettuare operazioni di inserimento, modifica e cancellazione."
            });

            guiders.createGuider({
                attachTo: "#PanelAddNewButton",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_modifica", "10", "#FFF", true); } }                            
                         ],
                description: "Tramite il pulsante <b>Nuovo</b> è possibile aggiungere una nuova riga alla tabella.",
                id: "9",
                overlay: true,
                next: "10",
                position: 6,
                title: "Inserimento di una nuova riga"
            });

             guiders.createGuider({
                attachTo: ".link_modifica",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".link_elimina", "11", "#FFF", true); } }
                         ],
                description: "Tramite il link <b>Modifica</b> è possibile modificare una riga della tabella.",
                id: "10",
                overlay: true,                
                next: "11",
                position: 3,
                title: "Modifica di una riga della tabella"
            });

            guiders.createGuider({
                attachTo: ".link_elimina",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX(".CheckBox,#TabellaDati_ctl03_GridDeleteSelection", "12", "", true); } }
                         ],
                description: "Tramite il link <b>Elimina</b> è possibile eliminare in modo definitivo una riga della tabella.",
                id: "11",
                overlay: true,                
                next: "12",
                position: 3,
                title: "Cancellazione di una riga della tabella"
            });

            guiders.createGuider({
                attachTo: ".CheckBox,#TabellaDati_ctl03_GridDeleteSelection",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("#Ricerca", "13", "#fff", false); } }
                         ],
                description: "Per eliminare più righe contemporaneamente, selezionare le righe tramite la relativa <b>casella di selezione</b> e cliccare sull'icona del <b>cestino</b>.",
                id: "12",
                overlay: true,                
                next: "13",
                position: 3,
                title: "Cancellazione multipla di righe della tabella"
            });

            guiders.createGuider({
                attachTo: "#Ricerca",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { highlightBOX("table.Pager", "14", "", false); } }
                         ],
                description: "Per ricercare delle righe, inserire il testo da ricercare e cliccare sul pulsante <b>Cerca</b>.<br/><br/>Per eliminare il filtro di ricerca cliccare sul pulsante <b>Visualizza tutto</b>.",
                id: "13",
                overlay: true,
                next: "14",
                position: 6,
                title: "Ricerca di una riga della tabella"
            });

            guiders.createGuider({
                attachTo: "table.Pager",
                buttons: [
                            { name: "Chiudi", onclick: function () { CloseGuiders(true, ""); } },
                            { name: "Continua", onclick: function () { guidersNext("end"); } }
                         ],
                description: "Puoi modificare il numero di record da visualizzare contemporaneamente nella stessa pagina e navigare tra le pagine.",
                id: "14",
                overlay: true,
                next: "end",
                position: 6,
                title: "Visualizzazione righe per tabella"
            });         

            guiders.createGuider({
                buttons: [{ name: "Chiudi", onclick: function () { CloseGuiders(true, "") } }],
                description: "Ora sei pronto per iniziare ad operare nella tua area riservata!<br/><br/><b>Buon lavoro!</b>",
                overlay: true,
                id: "end",
                position: "center",
                title: "Conclusione"
            });
            break;
    }
}


function apriTab(CloseTabNum, OpenTabNum, nextGuiders, IDToHighlight) {

    /* Chiudo il tab CloseTabNum*/
    $("#tabs-" + CloseTabNum).attr("class", "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
    $("#tabs-" + CloseTabNum).attr("style", "display:none;");

    /* Verifico se esiste il tab altrimenti passo al tab successivo*/
    for (var i = 0; ($("#tabs-" + OpenTabNum).length == 0); i++) {
        OpenTabNum++;
        nextGuiders++;
        IDToHighlight = IDToHighlight.split(",")[0] + "," + IDToHighlight.split(",")[1].replace(OpenTabNum - 1, OpenTabNum);
    }

    var numheader = IDToHighlight.split(",")[0].replace("#ui-accordion-accordion-header-", "");
    if ((!isNaN(numheader)) && (numheader != "")) {
        //"#ui-accordion-accordion-header-0,#tabs-0"
        /* Verifico se esiste il tab altrimenti passo al tab successivo*/
        for (var i = 0; ($("#ui-accordion-accordion-header-" + numheader).length == 0); i++) {
            numheader--;
        }

        IDToHighlight = "#ui-accordion-accordion-header-" + numheader + "," + IDToHighlight.split(",")[1];
    }
    /* Apro il tab OpenTabNum*/
    $("#tabs-" + OpenTabNum).attr("class", "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active");
    $("#tabs-" + OpenTabNum).attr("style", "");

    guiders.hideAll();
    if (nextGuiders != null)
        guiders.show(nextGuiders);

    if (IDToHighlight != "")
        highlightBOX(IDToHighlight, null, null, true);
}


var OLDhighlightID = "";

function highlightBOX(IDToHighlight, nextGuiders, IDBGColor, DisableArea) {
    var IDs;
    if (OLDhighlightID != "") {
        IDs = OLDhighlightID.split(",");
        for (var i = 0; i < IDs.length; i++) {
            //if (IDs[i] == "log")
                $(IDs[i]).css("background", "");

            $(IDs[i]).css("box-shadow", "");
            $(IDs[i]).css("z-index", "");
            $(IDs[i]).css("position", "");
        }
    }

    OLDhighlightID = IDToHighlight;
    var tab = false;

    IDs = IDToHighlight.split(",");
    for (var i = 0; i < IDs.length; i++) {
        if (/ui-accordion-accordion-header-[0-9]+/.test(IDs[i])) {
            $(IDs[i]).css("box-shadow", "0 7px 8px 0 #111111");
            tab = true;
        }
        else if (tab) {
            $(IDs[i]).css("box-shadow", "0 4px 8px 0 #111111");
            tab = false;
        }
        else
            $(IDs[i]).css("box-shadow", " 0 0 8px #111111");

        if ((IDBGColor != "") && (IDBGColor != null))
            $(IDs[i]).css("background", IDBGColor);


        $(IDs[i]).css("z-index", "10");
        $(IDs[i]).css("position", "relative");

        /* Rimuove il div di protezione, se inserito*/
        $("#shield").remove();
        /* Verifico se bisogna disabilitare l'area evidenziata*/
        if (DisableArea) {
            $(IDs[i]).append("<div id='shield' style='position: relative; z-index: 11; background: transparent; height: " + $(IDs[i]).css("height") + "; width: " + $(IDs[i]).css("width") + "; margin-top:-" + $(IDs[i]).css("height") + "'>");
        }
    }

    if (nextGuiders != null) {
        guiders.hideAll();
        guiders.show(nextGuiders);
    }
}

function CloseGuiders(removeBG, pathFunzioni) {
    if (OLDhighlightID != "") {
        IDs = OLDhighlightID.split(",");
        for (var i = 0; i < IDs.length; i++) {
            if (removeBG)
                $(IDs[i]).css("background", "");

            $(IDs[i]).css("box-shadow", "");
            $(IDs[i]).css("z-index", "");
            $(IDs[i]).css("position", "");
        }
    }

    /* Cancello la variabile di Sessione delle guide*/
    GuideInNewPage("", pathFunzioni);

    /* Rimuove il div di protezione, se inserito*/
    $("#shield").remove();

    OLDhighlightID = "";
    guiders.hideAll();
}

function ChangePage(linktoredirect, nextGuiders) {
    window.location = linktoredirect;
    if (nextGuiders != null) {
        guiders.hideAll();
        guiders.show(nextGuiders);
    }
}

/* Imposta la sessione con l'ID della guida da eseguire nella nuova pagina aperta*/
function GuideInNewPage(nextGuideID, pathFunzioni) {

    $(function () {
        $.ajax({
            url: pathFunzioni + "Funzioni.aspx",
            type: "GET", // POST or GET
            dataType: "json", // Tell it we're retrieving JSON
            async: false,
            data: {
                op: "SetGuideID",
                GuideID: nextGuideID
            }
        }); // fine ajax
    }); // fine function
}

/* Pulisce il div dagli dagli effetti rilievo e va avanti*/
function guidersNext(NextGuidersID) {
    var IDs;
    if (OLDhighlightID != "") {
        IDs = OLDhighlightID.split(",");
        for (var i = 0; i < IDs.length; i++) {
            if (IDs[i] == "#log")
                $(IDs[i]).css("background", "");

            $(IDs[i]).css("box-shadow", "");
            $(IDs[i]).css("z-index", "");
            $(IDs[i]).css("position", "");
        }
    }

    /* Rimuove il div di protezione, se inserito*/
    $("#shield").remove();

    OLDhighlightID = "";
    guiders.hideAll();
    guiders.show(NextGuidersID);
}

function ifIDExist(id, nextExist, nextNotExist) {
    if ($(id))
        guidersNext(nextExist);
    else
        guidersNext(nextNotExist);
}