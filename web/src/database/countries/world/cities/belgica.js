// Universidades por ciudad de Bélgica. Generado; no editar a mano.
//
// Se carga bajo demanda al abrir una ciudad, no en el arranque del globo.
// Cada universidad lleva en un comentario a cuantos km del centro de la
// ciudad esta: es lo que justifica la asignacion, y permite revisarla. Las
// que quedaron a mas del radio no estan en ningun sitio, que es lo correcto.
//
// `type` va en null siempre: la fuente abierta no dice si es publica o
// privada. `website` solo aparece si el nombre cuadra exactamente con una
// entrada de Hipolabs.

import { defineUniversity } from "../../schema.js";

export default {
  "belgica-leuven": [
      defineUniversity({
        id: "belgica-leuven-american-college-of-the-immaculate-conception",
        name: "American College of the Immaculate Conception",
        cityId: "belgica-leuven",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Leuven (Wikidata).
      }),
      defineUniversity({
        id: "belgica-leuven-state-university-of-leuven",
        name: "State University of Leuven",
        cityId: "belgica-leuven",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Leuven (Wikidata).
      }),
      defineUniversity({
        id: "belgica-leuven-faculty-of-theology-catholic-university-of-louvain",
        name: "Faculty of Theology, Catholic University of Louvain",
        cityId: "belgica-leuven",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Leuven (Wikidata).
      }),
      defineUniversity({
        id: "belgica-leuven-catholic-university-of-leuven-1834-1968",
        name: "Catholic University of Leuven (1834–1968)",
        cityId: "belgica-leuven",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Leuven (Wikidata).
      }),
      defineUniversity({
        id: "belgica-leuven-old-university-of-leuven",
        name: "Old University of Leuven",
        cityId: "belgica-leuven",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Leuven (Wikidata).
      }),
      defineUniversity({
        id: "belgica-leuven-katholieke-universiteit-leuven",
        name: "Katholieke Universiteit Leuven",
        cityId: "belgica-leuven",
        website: "https://www.kuleuven.be/",
        source: "open-dataset",
        // Situada a None km del centro de Leuven (Wikidata).
      }),
  ],
  "belgica-gent": [
      defineUniversity({
        id: "belgica-gent-ghent-university",
        name: "Ghent University",
        cityId: "belgica-gent",
        website: null,
        source: "open-dataset",
        // Situada a 0.9 km del centro de Gent (Wikidata).
      }),
      defineUniversity({
        id: "belgica-gent-office-of-the-rector-university-of-ghent",
        name: "Office of the Rector (University of Ghent)",
        cityId: "belgica-gent",
        website: null,
        source: "open-dataset",
        // Situada a 0.8 km del centro de Gent (Wikidata).
      }),
      defineUniversity({
        id: "belgica-gent-vlaamsche-hoogeschool",
        name: "Vlaamsche Hoogeschool",
        cityId: "belgica-gent",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Gent (Wikidata).
      }),
      defineUniversity({
        id: "belgica-gent-reformed-academy-in-ghent",
        name: "Reformed Academy in Ghent",
        cityId: "belgica-gent",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Gent (Wikidata).
      }),
  ],
  "belgica-brussels": [
      defineUniversity({
        id: "belgica-brussels-new-university-of-brussels",
        name: "New University of Brussels",
        cityId: "belgica-brussels",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brussels (Wikidata).
      }),
      defineUniversity({
        id: "belgica-brussels-ecole-superieure-des-arts-de-l-image-le-75",
        name: "École Supérieure des Arts de l'Image Le 75",
        cityId: "belgica-brussels",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brussels (Wikidata).
      }),
      defineUniversity({
        id: "belgica-brussels-ecole-polytechnique-de-bruxelles",
        name: "École polytechnique de Bruxelles",
        cityId: "belgica-brussels",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brussels (Wikidata).
      }),
      defineUniversity({
        id: "belgica-brussels-brussels-school-of-international-studies",
        name: "Brussels School of International Studies",
        cityId: "belgica-brussels",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brussels (Wikidata).
      }),
      defineUniversity({
        id: "belgica-brussels-royal-military-and-mathematics-academy-of-brussels",
        name: "Royal Military and Mathematics Academy of Brussels",
        cityId: "belgica-brussels",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Brussels (Wikidata).
      }),
  ],
  "belgica-etterbeek": [
      defineUniversity({
        id: "belgica-etterbeek-faculteit-voor-protestantse-godgeleerdheid",
        name: "Faculteit voor Protestantse Godgeleerdheid",
        cityId: "belgica-etterbeek",
        website: null,
        source: "open-dataset",
        // Situada a 1.2 km del centro de Etterbeek (Wikidata).
      }),
      defineUniversity({
        id: "belgica-etterbeek-royal-military-academy",
        name: "Royal Military Academy",
        cityId: "belgica-etterbeek",
        website: "http://www.rma.ac.be/",
        source: "open-dataset",
        // Situada a 1.4 km del centro de Etterbeek (Wikidata).
      }),
      defineUniversity({
        id: "belgica-etterbeek-free-university-of-brussels",
        name: "Free University of Brussels",
        cityId: "belgica-etterbeek",
        website: null,
        source: "open-dataset",
        // Situada a 1.3 km del centro de Etterbeek (Wikidata).
      }),
      defineUniversity({
        id: "belgica-etterbeek-universite-libre-de-bruxelles",
        name: "Université libre de Bruxelles",
        cityId: "belgica-etterbeek",
        website: "https://www.ulb.be/",
        source: "open-dataset",
        // Situada a 2.4 km del centro de Etterbeek (Wikidata).
      }),
      defineUniversity({
        id: "belgica-etterbeek-vrije-universiteit-brussel",
        name: "Vrije Universiteit Brussel",
        cityId: "belgica-etterbeek",
        website: "http://www.vub.ac.be/",
        source: "open-dataset",
        // Situada a 1.3 km del centro de Etterbeek (Wikidata).
      }),
  ],
  "belgica-namur": [
      defineUniversity({
        id: "belgica-namur-university-of-namur",
        name: "University of Namur",
        cityId: "belgica-namur",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Namur (Wikidata).
      }),
      defineUniversity({
        id: "belgica-namur-cerefim",
        name: "CeReFiM",
        cityId: "belgica-namur",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Namur (Wikidata).
      }),
      defineUniversity({
        id: "belgica-namur-haute-ecole-de-la-province-de-namur",
        name: "Haute Ecole de la Province de Namur",
        cityId: "belgica-namur",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Namur (Wikidata).
      }),
  ],
  "belgica-mons": [
      defineUniversity({
        id: "belgica-mons-university-of-mons-hainaut",
        name: "University of Mons-Hainaut",
        cityId: "belgica-mons",
        website: null,
        source: "open-dataset",
        // Situada a 0.6 km del centro de Mons (Wikidata).
      }),
      defineUniversity({
        id: "belgica-mons-catholic-university-of-mons",
        name: "Catholic university of Mons",
        cityId: "belgica-mons",
        website: null,
        source: "open-dataset",
        // Situada a 2.2 km del centro de Mons (Wikidata).
      }),
      defineUniversity({
        id: "belgica-mons-faculte-polytechnique-de-mons",
        name: "Faculté polytechnique de Mons",
        cityId: "belgica-mons",
        website: "http://www.fpms.ac.be/",
        source: "open-dataset",
        // Situada a 0.3 km del centro de Mons (Wikidata).
      }),
      defineUniversity({
        id: "belgica-mons-university-of-mons",
        name: "University of Mons",
        cityId: "belgica-mons",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Mons (Wikidata).
      }),
  ],
  "belgica-antwerp": [
      defineUniversity({
        id: "belgica-antwerp-university-of-antwerp",
        name: "University of Antwerp",
        cityId: "belgica-antwerp",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Antwerp (Wikidata).
      }),
      defineUniversity({
        id: "belgica-antwerp-saint-ignatius-university-centre-antwerp",
        name: "Saint Ignatius University Centre, Antwerp",
        cityId: "belgica-antwerp",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Antwerp (Wikidata).
      }),
      defineUniversity({
        id: "belgica-antwerp-universitaire-faculteiten-sint-ignatius-antwerpen",
        name: "Universitaire Faculteiten Sint-Ignatius Antwerpen",
        cityId: "belgica-antwerp",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Antwerp (Wikidata).
      }),
      defineUniversity({
        id: "belgica-antwerp-rijksuniversitair-centrum-antwerpen",
        name: "Rijksuniversitair Centrum Antwerpen",
        cityId: "belgica-antwerp",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Antwerp (Wikidata).
      }),
  ],
  "belgica-mechelen": [
      defineUniversity({
        id: "belgica-mechelen-berthoutinstituut-klein-seminarie",
        name: "Berthoutinstituut Klein Seminarie",
        cityId: "belgica-mechelen",
        website: null,
        source: "open-dataset",
        // Situada a 0.7 km del centro de Mechelen (Wikidata).
      }),
      defineUniversity({
        id: "belgica-mechelen-grand-seminary-mechelen",
        name: "Grand Seminary Mechelen",
        cityId: "belgica-mechelen",
        website: null,
        source: "open-dataset",
        // Situada a 0.5 km del centro de Mechelen (Wikidata).
      }),
      defineUniversity({
        id: "belgica-mechelen-catholic-university-of-mechlin",
        name: "Catholic University of Mechlin",
        cityId: "belgica-mechelen",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Mechelen (Wikidata).
      }),
  ],
  "belgica-heverlee": [
      defineUniversity({
        id: "belgica-heverlee-evangelical-theological-faculty",
        name: "Evangelical Theological Faculty",
        cityId: "belgica-heverlee",
        website: null,
        source: "open-dataset",
        // Situada a 2.3 km del centro de Heverlee (Wikidata).
      }),
  ],
  "belgica-woluwe-saint-lambert": [
      defineUniversity({
        id: "belgica-woluwe-saint-lambert-ecole-pratique-des-hautes-etudes-commerciales",
        name: "École pratique des hautes études commerciales",
        cityId: "belgica-woluwe-saint-lambert",
        website: null,
        source: "open-dataset",
        // Situada a None km del centro de Woluwe-Saint-Lambert (Wikidata).
      }),
  ],
  "belgica-tournai": [
      defineUniversity({
        id: "belgica-tournai-seminary-of-tournai",
        name: "Seminary of Tournai",
        cityId: "belgica-tournai",
        website: null,
        source: "open-dataset",
        // Situada a 0.4 km del centro de Tournai (Wikidata).
      }),
  ],
  "belgica-louvain-la-neuve": [
      defineUniversity({
        id: "belgica-louvain-la-neuve-uclouvain",
        name: "UCLouvain",
        cityId: "belgica-louvain-la-neuve",
        website: null,
        source: "open-dataset",
        // Situada a 0.2 km del centro de Louvain-la-Neuve (Wikidata).
      }),
  ],
  "belgica-liege": [
      defineUniversity({
        id: "belgica-liege-university-of-liege",
        name: "University of Liège",
        cityId: "belgica-liege",
        website: "https://uliege.be/",
        source: "open-dataset",
        // Situada a 0.9 km del centro de Liège (Wikidata).
      }),
      defineUniversity({
        id: "belgica-liege-hec-management-school-university-of-liege",
        name: "HEC Management School – University of Liège",
        cityId: "belgica-liege",
        website: null,
        source: "open-dataset",
        // Situada a 0.3 km del centro de Liège (Wikidata).
      }),
  ],
};
