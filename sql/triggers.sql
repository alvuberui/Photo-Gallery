-- Sólo se puede comentar fotos con visibilidad pública
DELIMITER //
CREATE OR REPLACE TRIGGER TriggerInsertComments
	BEFORE INSERT ON Comments
	FOR EACH ROW
	BEGIN
	    DECLARE photo INT;
	    DECLARE visib VARCHAR(16);
	
	    SET photo = new.photoId;
	    SET visib = (SELECT Photos.visibility FROM Photos WHERE 
	        Photos.photoId  = photo);
	
		IF (visib = 'Private') THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
			'No se puede publicar un comentario en una foto con visibilidad privada';
		END IF;
	END//
DELIMITER ;

-- Limitación en el número de fotos
DELIMITER //
CREATE OR REPLACE TRIGGER TriggerlimitPhotos
	AFTER INSERT ON Photos
	FOR EACH ROW
	BEGIN
	    DECLARE user INT;
	    DECLARE numFotos INT;
	
	    SET user = new.userId;
	    SET numFotos = (SELECT COUNT(*) FROM Photos WHERE 
	        Photos.userId  = user);
	
		IF (numFotos > 50) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
			'No se pueden publicar más de 50 fotos por usuario';
		END IF;
	END//
DELIMITER ;

-- Lenguaje inapropiado en título y descripción
DELIMITER //
CREATE OR REPLACE TRIGGER TriggerInpropiateWordsPhotos
	BEFORE INSERT ON Photos
	FOR EACH ROW
	BEGIN
	    DECLARE numTitle INT;
		DECLARE numDescription INT;
		DECLARE numPalabras INT;
		DECLARE acum INT;
		DECLARE palabra VARCHAR(50);

		SET numPalabras = (SELECT COUNT(*) FROM InappropriatesWords);
		SET acum = 0;

	    WHILE acum <= numPalabras DO 
			SET palabra = (SELECT word FROM InappropriatesWords WHERE InappropriateWordId = acum);

			SET numTitle = INSTR(new.title, palabra); 

			IF(numTitle > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'El titulo contiene al menos una palabra inapropiada';
			END IF;

			SET ACUM = ACUM + 1;

		END WHILE;
		
		SET ACUM = 0;

		WHILE acum <= numPalabras DO
			SET palabra = (SELECT word FROM InappropriatesWords WHERE InappropriateWordId = acum);
			SET numDescription = INSTR(new.description, palabra); 

			IF(numDescription > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'La descripcion contiene al menos una palabra inapropiada';
			END IF;

			SET ACUM = ACUM + 1;

		END WHILE;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER TriggerInpropiateWordsPhotosUpdate
	BEFORE UPDATE ON Photos
	FOR EACH ROW
	BEGIN
	    DECLARE numTitle INT;
		DECLARE numDescription INT;
		DECLARE numPalabras INT;
		DECLARE acum INT;
		DECLARE palabra VARCHAR(50);

		SET numPalabras = (SELECT COUNT(*) FROM InappropriatesWords);
		SET acum = 0;

	    WHILE acum <= numPalabras DO 
			SET palabra = (SELECT word FROM InappropriatesWords WHERE InappropriateWordId = acum);

			SET numTitle = INSTR(new.title, palabra); 

			IF(numTitle > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'El titulo contiene al menos una palabra inapropiada';
			END IF;

			SET ACUM = ACUM + 1;

		END WHILE;
		
		SET ACUM = 0;

		WHILE acum <= numPalabras DO
			SET palabra = (SELECT word FROM InappropriatesWords WHERE InappropriateWordId = acum);
			SET numDescription = INSTR(new.description, palabra); 

			IF(numDescription > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'La descripcion contiene al menos una palabra inapropiada';
			END IF;

			SET ACUM = ACUM + 1;

		END WHILE;
	END//
DELIMITER ;

-- UNA FOTO CON COMENTARIOS NO PUEDE MARCARSE COMO PRIVADA NI ELIMINARSE
DELIMITER //
CREATE OR REPLACE TRIGGER TriggerDeletePhotos
	BEFORE DELETE ON Photos
	FOR EACH ROW
	BEGIN
	    DECLARE numComments INT;
		SET numComments = (SELECT COUNT(*) FROM Comments WHERE photoId = old.photoId);
	
	    IF(numComments > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'No se puede eliminar una foto que contiene comentarios';
		END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER TriggerUpdatePhotos
	BEFORE UPDATE ON Photos
	FOR EACH ROW
	BEGIN
	    DECLARE numComments INT;
		SET numComments = (SELECT COUNT(*) FROM Comments WHERE photoId = old.photoId);
	
	    IF(numComments > 0 AND new.visibility = 'Private' AND old.visibility = 'Public') THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'Una foto que contiene comentarios no se puede pasar a privada';
		END IF;
	END//
DELIMITER ;

-- Lenguaje apropiado en los comentarios de la foto
DELIMITER //
CREATE OR REPLACE TRIGGER TriggerInpropiateWordsComments
	BEFORE INSERT ON Comments
	FOR EACH ROW
	BEGIN
	    DECLARE numText INT;
		DECLARE numPalabras INT;
		DECLARE acum INT;
		DECLARE palabra VARCHAR(50);

		SET numPalabras = (SELECT COUNT(*) FROM InappropriatesWords);
		SET acum = 0;

	    WHILE acum <= numPalabras DO 
			SET palabra = (SELECT word FROM InappropriatesWords WHERE InappropriateWordId = acum);

			SET numText = INSTR(new.text, palabra); 

			IF(numText > 0) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT =
				'La descripcion contiene al menos una palabra inapropiada';
			END IF;

			SET ACUM = ACUM + 1;

		END WHILE;
	END//
DELIMITER ;

