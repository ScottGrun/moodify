-- Weekly_updated_playlists table seeds here
INSERT INTO weekly_updated_playlists (playlist_id, audio_features, created_at)
VALUES (1, '{ "acousticness": 0.514, "danceability": 0.735, "energy": 0.578, "instrumentalness": 0.0902, "loudness": -11.840, "instrumentalness": 0.0461, "valence": 0.624, "tempo": 98.002 }', '2020-03-22'), 
(2, '{ "acousticness": 0.675, "danceability": 0.421, "energy": 0.318, "instrumentalness": 0.046, "loudness": -23.040, "instrumentalness": 0.024, "valence": 0.384, "tempo": 85.000 }', '2020-04-12'),
(3, '{ "acousticness": 1.0, "danceability": 1.0, "energy": 1.0, "instrumentalness": 0.0, "loudness": -50.0, "instrumentalness": 1.0, "valence": 1.0, "tempo": 100.0 }', '2020-05-04'),
(4, '{ "acousticness": 0.023, "danceability": 0.45, "energy": 0.745, "instrumentalness": 1.0, "loudness": 10.0, "instrumentalness": 1.0, "valence": 0.80, "tempo": 95.0 }', '2020-06-15'),
(5, '{ "acousticness": 0.85, "danceability": 0.62, "energy": 0.98, "instrumentalness": 0.07, "loudness": -35.353, "instrumentalness": 0.003, "valence": 0.546, "tempo": 150.0 }', '2020-07-08');

-- acousticness range of 0.0 to 1.0
-- danceability range of 0.0 to 1.0
-- energy range of 0.0 to 1.0
-- instrumentalness range of 0.0 to 1.0
-- loudness range of -60.0 - 0.0
-- instrumentalness range of 0.0 to 1.0
-- valence range of 0.0 to 1.0
-- tempo from 0.0 + 
