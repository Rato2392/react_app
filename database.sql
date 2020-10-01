CREATE DATABASE microbiome;

CREATE TABLE users
(
    "users_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "first_name" VARCHAR(10) NOT NULL,
    "last_name" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "users_password" VARCHAR(255) NOT NULL,
    "institute" VARCHAR(20)
);


CREATE TABLE study
(
    "study_id" SERIAL PRIMARY KEY,
    "users_id" uuid NOT NULL,
    "title" VARCHAR(15) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "pubmed_id" VARCHAR(10),
    "doi" VARCHAR(15),
    FOREIGN KEY (users_id) REFERENCES users(users_id) ON DELETE CASCADE
);

CREATE TABLE sequences
(
    "seq_id" SERIAL PRIMARY KEY,
    "study_id" INT,
    "filename" VARCHAR,
    "path" VARCHAR,
    FOREIGN KEY (study_id) REFERENCES study(study_id) ON DELETE CASCADE

);

CREATE TABLE metadata
(
    "metadata_id" SERIAL PRIMARY KEY,
    "study_id" INT,
    "primers" VARCHAR,
    "chem_seq" VARCHAR,
    "seq_platform" VARCHAR,
    "quality_seq" VARCHAR,
    "filter_criteria" VARCHAR,
    "origin_biome" VARCHAR,
    "lib_name" VARCHAR,
    "lib_strat" VARCHAR,
    "lib_src" VARCHAR,
    "lib_select" VARCHAR,
    FOREIGN KEY (study_id) REFERENCES study(study_id) ON DELETE CASCADE

);

CREATE TABLE qc_data
(
    "qc_id" SERIAL PRIMARY KEY,
    "study_id" INT,
    "read_size" VARCHAR,
    "num_seq_reads" VARCHAR,
    "per_qc" VARCHAR,
    FOREIGN KEY (study_id) REFERENCES study(study_id) ON DELETE CASCADE

);

CREATE TABLE pro_seq
(
    "pro_seq_id" SERIAL PRIMARY KEY,
    "qc_id" INT,
    "pro_seq" VARCHAR,
    FOREIGN KEY (qc_id) REFERENCES qc_data(qc_id) ON DELETE CASCADE

);

CREATE TABLE tax_data
(
    "tax_id" SERIAL PRIMARY KEY,
    "study_id" INT,
    "ASV" VARCHAR,
    FOREIGN KEY (study_id) REFERENCES study(study_id) ON DELETE CASCADE

);

CREATE TABLE func_anal_data
(
    "fa_id" SERIAL PRIMARY KEY,
    "study_id" INT,
    "pro_acc" VARCHAR,
    "seq_md5_digest" VARCHAR,
    "seq_length" VARCHAR,
    "analysis" VARCHAR,
    "sig_acc" VARCHAR,
    "sig_description" VARCHAR,
    "start_loc" VARCHAR,
    "stop_loc" VARCHAR,
    "score" VARCHAR,
    "status" VARCHAR,
    "date" VARCHAR,
    FOREIGN KEY (study_id) REFERENCES study(study_id) ON DELETE CASCADE

);

DROP TABLE func_anal_data;
DROP TABLE tax_data;
DROP TABLE pro_seq;
DROP TABLE qc_data;
DROP TABLE metadata;
DROP TABLE sequences;
DROP TABLE study;

