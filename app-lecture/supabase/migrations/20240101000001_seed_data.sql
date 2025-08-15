-- Insertion des données initiales pour l'application d'apprentissage

-- Insertion des 5 phonèmes MVP selon la progression syllabique
INSERT INTO phonemes (symbole, graphemes, phase, ordre_phase, niveau_min, difficulte, description) VALUES
('/a/', ARRAY['a', 'A', 'à'], 1, 1, 'MS', 1, 'Premier phonème voyelle, le plus simple et fréquent'),
('/i/', ARRAY['i', 'I', 'î'], 1, 2, 'MS', 1, 'Voyelle fermée antérieure simple'),
('/o/', ARRAY['o', 'O', 'ô'], 1, 3, 'MS', 1, 'Voyelle moyenne postérieure simple'),
('/m/', ARRAY['m', 'M', 'mm'], 2, 1, 'GS', 2, 'Première consonne continue, bilabiale'),
('/l/', ARRAY['l', 'L', 'll'], 2, 2, 'GS', 2, 'Consonne liquide latérale fréquente');

-- Insertion des activités pour le phonème /a/ (id=1)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(1, 1, 'J''entends le son /a/', 'identification_auditive', 
 '{"mots_cibles": ["chat", "papa", "gâteau", "arbre", "table", "maman"], "mots_distracteurs": ["chien", "bébé", "vélo", "livre", "deux", "nez"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(1, 2, 'Je trouve la place du son /a/', 'localisation', 
 '{"mots": [{"mot": "chat", "position": "debut"}, {"mot": "papa", "position": "debut_fin"}, {"mot": "gâteau", "position": "debut"}, {"mot": "table", "position": "debut"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(1, 3, 'Je reconnais la lettre a', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["a", "A"], "distracteurs": ["e", "o", "u", "E", "O", "U"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(1, 4, 'Je combine avec la voyelle a', 'combinaison_cv',
 '{"voyelle": "a", "consonnes_etudiees": [], "syllabes_attendues": ["a"]}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(1, 5, 'Je lis des mots avec a', 'lecture_mots',
 '{"mots": ["a", "ah"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(1, 6, 'J''écris des mots avec a', 'ecriture_mots',
 '{"mots": ["a"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(1, 7, 'Je lis des phrases avec a', 'lecture_phrases',
 '{"phrases": ["A !"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "A"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');

-- Insertion des activités pour le phonème /i/ (id=2)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(2, 1, 'J''entends le son /i/', 'identification_auditive', 
 '{"mots_cibles": ["lit", "ami", "souris", "midi", "ici", "vie"], "mots_distracteurs": ["pot", "dos", "chat", "eau", "auto", "nez"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(2, 2, 'Je trouve la place du son /i/', 'localisation', 
 '{"mots": [{"mot": "lit", "position": "milieu"}, {"mot": "ami", "position": "fin"}, {"mot": "souris", "position": "fin"}, {"mot": "midi", "position": "debut_fin"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(2, 3, 'Je reconnais la lettre i', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["i", "I"], "distracteurs": ["l", "j", "t", "L", "J", "T"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(2, 4, 'Je combine avec la voyelle i', 'combinaison_cv',
 '{"voyelle": "i", "consonnes_etudiees": [], "syllabes_attendues": ["i"]}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(2, 5, 'Je lis des mots avec i', 'lecture_mots',
 '{"mots": ["i"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(2, 6, 'J''écris des mots avec i', 'ecriture_mots',
 '{"mots": ["i"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(2, 7, 'Je lis des phrases avec i', 'lecture_phrases',
 '{"phrases": ["I"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "I"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');

-- Insertion des activités pour le phonème /o/ (id=3)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(3, 1, 'J''entends le son /o/', 'identification_auditive', 
 '{"mots_cibles": ["pot", "dos", "mot", "beau", "zoo", "auto"], "mots_distracteurs": ["lit", "ami", "chat", "vélo", "deux", "nez"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(3, 2, 'Je trouve la place du son /o/', 'localisation', 
 '{"mots": [{"mot": "pot", "position": "milieu"}, {"mot": "dos", "position": "milieu"}, {"mot": "beau", "position": "fin"}, {"mot": "auto", "position": "fin"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(3, 3, 'Je reconnais la lettre o', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["o", "O"], "distracteurs": ["a", "e", "u", "A", "E", "U"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(3, 4, 'Je combine avec la voyelle o', 'combinaison_cv',
 '{"voyelle": "o", "consonnes_etudiees": [], "syllabes_attendues": ["o"]}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(3, 5, 'Je lis des mots avec o', 'lecture_mots',
 '{"mots": ["o"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(3, 6, 'J''écris des mots avec o', 'ecriture_mots',
 '{"mots": ["o"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(3, 7, 'Je lis des phrases avec o', 'lecture_phrases',
 '{"phrases": ["O !"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "O"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');

-- Insertion des activités pour le phonème /m/ (id=4)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(4, 1, 'J''entends le son /m/', 'identification_auditive', 
 '{"mots_cibles": ["maman", "ami", "maison", "mouton", "lime", "plume"], "mots_distracteurs": ["papa", "chat", "vélo", "dos", "eau", "nez"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(4, 2, 'Je trouve la place du son /m/', 'localisation', 
 '{"mots": [{"mot": "maman", "position": "debut"}, {"mot": "ami", "position": "debut"}, {"mot": "lime", "position": "fin"}, {"mot": "plume", "position": "fin"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(4, 3, 'Je reconnais la lettre m', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["m", "M"], "distracteurs": ["n", "h", "b", "N", "H", "B"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(4, 4, 'Je combine avec m', 'combinaison_cv',
 '{"consonne": "m", "voyelles_etudiees": ["a", "i", "o"], "syllabes_attendues": ["ma", "mi", "mo"]}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(4, 5, 'Je lis des mots avec m', 'lecture_mots',
 '{"mots": ["ma", "mi", "mo"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(4, 6, 'J''écris des mots avec m', 'ecriture_mots',
 '{"mots": ["ma"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(4, 7, 'Je lis des phrases avec m', 'lecture_phrases',
 '{"phrases": ["ma"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "ma"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');

-- Insertion des activités pour le phonème /l/ (id=5)
INSERT INTO activites (phoneme_id, ecran_numero, titre, type_activite, contenu, criteres_reussite) VALUES
(5, 1, 'J''entends le son /l/', 'identification_auditive', 
 '{"mots_cibles": ["lit", "lune", "table", "école", "belle", "sol"], "mots_distracteurs": ["chat", "ami", "dos", "vélo", "deux", "nez"], "repetitions": 3}',
 '{"score_minimum": 0.8, "tentatives_max": 5}'),

(5, 2, 'Je trouve la place du son /l/', 'localisation', 
 '{"mots": [{"mot": "lit", "position": "debut"}, {"mot": "lune", "position": "debut"}, {"mot": "table", "position": "fin"}, {"mot": "école", "position": "fin"}], "positions": ["début", "milieu", "fin"]}',
 '{"score_minimum": 0.7, "tentatives_max": 6}'),

(5, 3, 'Je reconnais la lettre l', 'reconnaissance_grapheme',
 '{"graphemes_cibles": ["l", "L"], "distracteurs": ["i", "j", "t", "I", "J", "T"], "polices": ["Arial", "Comic Sans"]}',
 '{"score_minimum": 0.9, "tentatives_max": 4}'),

(5, 4, 'Je combine avec l', 'combinaison_cv',
 '{"consonne": "l", "voyelles_etudiees": ["a", "i", "o"], "syllabes_attendues": ["la", "li", "lo"]}',
 '{"score_minimum": 0.8, "tentatives_max": 8}'),

(5, 5, 'Je lis des mots avec l', 'lecture_mots',
 '{"mots": ["la", "li", "lo"], "difficulte_progressive": true}',
 '{"score_minimum": 0.8, "tentatives_max": 6}'),

(5, 6, 'J''écris des mots avec l', 'ecriture_mots',
 '{"mots": ["la"], "aide_visuelle": true}',
 '{"score_minimum": 0.7, "tentatives_max": 8}'),

(5, 7, 'Je lis des phrases avec l', 'lecture_phrases',
 '{"phrases": ["la"], "questions": [{"question": "Qu\'est-ce que tu lis ?", "reponse": "la"}]}',
 '{"score_minimum": 0.8, "tentatives_max": 5}');
