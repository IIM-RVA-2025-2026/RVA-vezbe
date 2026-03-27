package rva_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Artikl {
	
	@Id
	@SequenceGenerator(name = "artikl_seq", sequenceName = "artikl_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "artikl_seq")
	private int id;
	private String naziv;
	private String proizvodjac;
	
	
	public Artikl(int id, String naziv, String proizvodjac) {
		this.id = id;
		this.naziv = naziv;
		this.proizvodjac = proizvodjac;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getNaziv() {
		return naziv;
	}


	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}


	public String getProizvodjac() {
		return proizvodjac;
	}


	public void setProizvodjac(String proizvodjac) {
		this.proizvodjac = proizvodjac;
	}
	
	

}
