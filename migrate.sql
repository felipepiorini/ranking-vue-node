CREATE TABLE `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) DEFAULT NULL,
  `escola_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `escolas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `ranking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_aluno` int DEFAULT NULL,
  `ponto` varchar(45) DEFAULT NULL,
  `data` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
)