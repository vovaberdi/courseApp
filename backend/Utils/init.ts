export const createStudents = "CREATE TABLE IF NOT EXISTS `collage`.`students` (`id` INT NOT NULL AUTO_INCREMENT,`course_id` INT NULL,`first_name` VARCHAR(45) NULL,`last_name` VARCHAR(45) NULL,`personal_id` INT NULL,`data_of_birth` DATETIME NULL,`tel` VARCHAR(45) NULL,`address` VARCHAR(45) NULL,`email` VARCHAR(45) NULL,`signature` TEXT NULL, PRIMARY KEY (`id`))";

export const createInstructor = "CREATE TABLE IF NOT EXISTS `collage`.`instructor` (`id` INT NOT NULL AUTO_INCREMENT,`first_name` VARCHAR(45) NULL,`last_name` VARCHAR(45) NULL,`personal_id` INT NULL,`data_of_birth` DATETIME NULL,`tel` VARCHAR(45) NULL,`address` VARCHAR(45) NULL,`license_number` INT NULL,`years_of_experience` INT NULL,`license_exp_date` DATETIME NULL,`signature` TEXT NULL, PRIMARY KEY (`id`))";

export const createClasses = "CREATE TABLE IF NOT EXISTS `collage`.`course` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NULL,PRIMARY KEY (`id`))";
