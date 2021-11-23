# QResent

QResent este o aplicatie de tip mobile ce vine in intampinarea problemelor digitalizarii sistemului educational. Aceasta este adresata atat studentilor, profesorilor cat si a adminitratorilor inregistrati. In functie de rolul utilizatorului aplicatia ofera diverse avantaje, precum: 
  - urmarire atenta a informatiilor de actualitate si a statisticilor oferite de fiecare materie
  - un sistem de identificare a studentilor prezenti in cadrul activitatiilor prin scanarea codurilor QR
  - configurarea materiilor (informatii utile: cerinte minime, intervale orare)
  - descarcarea listelor de prezente pentru orice activitate din trecut

## Componenta frontend
Pe partea de frontend se realizeaza interfatarea aplicatiei cu utilizatorul, preluarea datelor din interactiunea cu acesta, comunicarea lor catre backend si prezentarea rezultatelor primite de la backend. In paginile de frontend sunt expuse utilizatorilor, in functie de tipul acestora, functionalitatile principale.

### Paginile aplicatiei
  - Log In - autentificare
  - Sign Up - crearea cont
  - Home - pagina de profil
  - Program - pagina cu calendar/orar
  - QR - generarea/scanarea codului QR
  - Statistici - afisarea prezentei in format grafic
  - Exportarea listei de prezenta - functionalitatea doar pentru admin si profesor
  - Pagina admin - stergerea si adaugarea utilizatorilor
  
### Logica QR
**Generarea** - QR-ul se regenereaza automat o data la un minut, sau la fiecare apasare a butonului de Generate. Un cod QR contine identificatorul activitatii curente si ora la care a fost generat

**Scanarea** - Studentii scaneaza si trimit un request POST cu informatia din QR catre backend. Daca diferenta dintre ora la care a ajuns cererea in backend si ora de generarea a QR-ului este prea marea, cererea de prezenta nu va fi acceptata si studentul va primi mesaj de QR invalid.

**Validare & anti-frauda** - este realizata prin QR dinamic in timp si timp limitat de trimitere a scanarii. O functionalitate utilizabila pentru mediul fizic este adaugarea pozitiei studentului pentru a ne asigura ca acesta scaneaza din interiorul campusului.

## Tehnologii
- [React 17](https://reactjs.org/blog/2020/10/20/react-v17.html)
- [MUI](https://mui.com)
- [Ant Design](https://ant.design)
- [QR React](https://www.npmjs.com/package/react-qr-code)
- [ReactDOM](https://reactjs.org/docs/react-dom.html)
- [Testing Library](https://testing-library.com)

## Instalarea si rularea
Trebuie realizata in paralel cu rularea de backen
```bash
  git clone https://github.com/iuliiaioana/QResentF.git
  cd QResentF
  npm i
  npm start
```

## Documentatie

[Documentatie](https://docs.google.com/document/d/1TDuirgfmvJI1fCM7e3zsZY7MwS0vCSaKm8aOa0JYNRM/edit)    

## Echipa dezvoltare
- [@Iulia Anghel](https://github.com/iuliiaioana) PM
- [@Lucian Roinita](https://github.com/roinitalucian) TEAM LEAD
- [@Dragos Calin](https://github.com/CalinDS) FE Developer + Tester
- [@Roberta Calin](https://github.com/robertacalin) FE Developer
- [@Vlad Radutoiu](https://github.com/VladRadutoiu) FE Developer
- [@Lavinia Nedelea](https://github.com/laviniamnedelea) BE Developer