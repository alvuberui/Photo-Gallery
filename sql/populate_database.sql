SET FOREIGN_KEY_CHECKS=0;
DELETE FROM Comments;
Delete from Ratings;
Delete from Categories;
Delete from Photos;
Delete from Users;
Delete from InappropriatesWords;
SET FOREIGN_KEY_CHECKS=1;
ALTER TABLE Comments AUTO_INCREMENT=1;
ALTER TABLE Ratings AUTO_INCREMENT=1;
ALTER TABLE Categories AUTO_INCREMENT=1;
ALTER TABLE Photos AUTO_INCREMENT=1;
ALTER TABLE Users AUTO_INCREMENT=1;
ALTER TABLE InappropriatesWords AUTO_INCREMENT=1;


INSERT INTO Users 
  VALUES
    (1, 'Álvaro', 'Úbeda', '651322040', 'alvaro_ubeda8', 'asdf1234', 'https://pbs.twimg.com/profile_images/1145466651783172096/3rhbqpIC.jpg', "alvuberui@alum.us.es"),
    (2, 'Álvaro', 'Alferez', '655345797', 'deimos', 'asdfgh45', 'https://www.estadiodeportivo.com/elementosWeb/gestionCajas/EDE/Image/escudo-Real-Betis-2012.jpg', "alvalfric@alum.us.es" ),
    (3, 'Álvaro', 'Vaquero', '688983455', 'rocketa_vaquero', '12345678', 'https://ladiversiva.com/wp-content/uploads/2019/03/10_peliculas_dinosaurios_familia-555x445.jpg', "alvvaqjim@alum.us.es"),
    (4, 'Juan', 'Pilotes', '325641222', 'juanito59', 'asdfgrf', 'https://uh.gsstatic.es/sfAttachPlugin/1087543.jpg', "juapilfer@alum.us.es");

INSERT INTO Photos
  VALUES
    (1, 'Tortilla', 'A typical Spanish tortilla. With onion, of course.', '2012-04-23 18:25:43', 'https://ichef.bbci.co.uk/news/640/cpsprodpb/F403/production/_109476426_jheison3.png', 'Public', 1),
    (2, 'Samoyed', 'A very fluffy dog', '2013-04-23 18:21:43', 'https://www.dogsnsw.org.au/media/img/BrowseAllBreed/Samoyed-.jpg', 'Public',2),
    (3, 'Coding in C#', 'A piece of very intricate code', '2020-04-23 18:20:43', 'https://pbs.twimg.com/media/Ea4HJNaXsAEbzzF?format=jpg&name=900x900', 'Public',2),
    (4, 'The future society', "This is how society would look like if PHP didn\'t exist", '2016-05-10 18:21:43', 'https://i.kym-cdn.com/entries/icons/facebook/000/026/738/future.jpg', 'Public',1),
    (5, 'Comfy cat', 'A drawing of a cat about to sleep', '2016-04-23 18:21:43', 'https://pbs.twimg.com/media/EZ4Z2QDUYAANA-Z?format=png', 'Public',4),
    (6, 'Seville', 'The beautiful city of Seville, Spain', '2016-04-23 18:20:43', 'https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg', 'Public',3),
    (7, 'Mont Saint-Michel', 'An island located in Normandy, France', '2019-04-23 18:20:43', 'https://www.timetravelturtle.com/wp-content/uploads/2019/11/Mont-St-Michel-2019-356_new.jpg', 'Public',3),
    (8, 'Night operations', 'A plane flying over Toronto at night', '2020-02-28 13:33:37', 'https://www.airlive.net/wp-content/uploads/2016/09/maxresdefault-23.jpg', 'Private',4),
    (9, 'Abstract art', 'A very weird clipart', '2015-05-01 12:23:11', 'https://clipartart.com/images/worst-clipart-ever-1.jpg', 'Private',1),
    (10, 'Knitting', 'Very relaxing', '2019-01-12 21:30:00', "https://cdn.shopify.com/s/files/1/0078/5065/5857/t/8/assets/62638885ceb5--CocoKnitsBook_Appendix_Photo5_2692.jpg?1338", 'Private',3);
  
INSERT INTO Ratings VALUES
  (1, '2012-04-23 18:26:43', 5, 2, 1), 
  (2, '2012-04-23 18:40:43', 4, 3, 1),
  (3, '2012-04-23 18:50:43', 5, 4, 1),
  (4, '2012-04-23 18:50:43', 5, 1, 1),
  (5, '2012-04-23 18:50:43', 5, 4, 2),
  (6, '2012-04-23 18:50:43', 5, 4, 3),
  (7, '2012-04-23 18:50:43', 5, 4, 4),
  (8, '2012-04-23 18:50:43', 5, 4, 5),
  (9, '2012-04-23 18:50:43', 5, 4, 6),
  (10, '2012-04-23 18:50:43', 5, 4, 7),
  (11, '2012-04-23 18:50:43', 5, 4, 8),
  (12, '2012-04-23 18:50:43', 5, 4, 9);

INSERT INTO Categories VALUES 
  (1, 'categoria1'),
  (2, 'Categoria2'),
  (3, 'Categoria3');

INSERT INTO PhotosCategories VALUES 
  (1, 1, 1),
  (2, 1, 2),
  (3, 2, 3),
  (4, 3, 1),
  (5, 4, 2),
  (6, 5, 3),
  (7, 6, 1),
  (8, 7, 2),
  (9, 8, 3),
  (10, 9, 1);

INSERT INTO Comments  VALUES
  (1, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',1, 1),
  (2, "Bonita foto!", '2012-04-23 18:50:43',1, 2),
  (3, "Preciosa!", '2013-04-23 18:50:43',1, 3),
  (4, "Gracias a todos!", '2014-04-23 18:50:43',1, 1),
  (5, "Me encanta", '2015-04-23 18:50:43',1, 4),
  (6, "Gracias!", '2016-04-23 18:50:43',1, 1),
  (7, "Nada :D", '2016-05-23 18:50:43',1, 4),
  (8, "Me gusta", '2012-04-23 18:50:43',2, 1),
  (9, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',3, 1),
  (10, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',4, 1),
  (11, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',5, 1),
  (12, "Preciosa!", '2012-04-23 18:50:43',5, 2),
  (13, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',6, 3),
  (14, "Esto es un comentario generico, para probar que se visualiza bien el comentario y para comproar que la aplicación funciona correctamente", '2012-04-23 18:50:43',7, 2);

INSERT INTO InappropriatesWords VALUES
  (1, "tonto"),
  (2, "sexo"),
  (3, "gilipollas"),
  (4, "inútil");


