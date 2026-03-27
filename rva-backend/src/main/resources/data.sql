-- Artikl podaci
insert into artikl (id, naziv, proizvodjac)
values (nextval('artikl_seq'), 'Moja Kravica dugotrajno mleko', 'AD Imlek'),
       (nextval('artikl_seq'), 'Moja Kravica jogurt', 'AD Imlek'),
       (nextval('artikl_seq'), 'Persil Regular prasak', 'Henkel Srbija d.o.o.'),
       (nextval('artikl_seq'), 'Jabuka Gala', 'Delhaize Serbia d.o.o.'),
       (nextval('artikl_seq'), 'Puding vanila Dr. Oetker', 'Dr. Oetker d.o.o.'),
       (nextval('artikl_seq'), 'Puding cokolada Dr. Oetker', 'Dr. Oetker d.o.o.');
       
       -- Dobavljac podaci
insert into dobavljac
values (nextval('dobavljac_seq'), 'AD Imlek', 'Industrijsko naselje bb, Padinska skela, Beograd', '+381113050505'),
       (nextval('dobavljac_seq'), 'Henkel Srbija d.o.o.', 'Bulevar Oslobodjenja 383, Beograd', '+381112072200'),
       (nextval('dobavljac_seq'), 'Delhaize Serbia d.o.o.', 'Jurija Gagarina 14, Beograd', '08003537030'),
       (nextval('dobavljac_seq'), 'Dr. Oetker d.o.o.', 'Vuka Karadzica 13, Simanovci', '+38122800300');