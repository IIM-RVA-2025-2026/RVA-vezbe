package rva_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
public class StavkaPorudzbine {
	
	@Id
	@SequenceGenerator(name="stavka_porudzbine_seq", sequenceName="stavka_porudzbine_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="stavka_porudzbine_seq")
	private int id;
	private int redniBroj;
	private double kolicina;
	private double cena;
	private String jedinicaMere;
	
	@ManyToOne
	@JoinColumn(name="porudzbina")
	private Porudzbina porudzbina;
	
	@ManyToOne
	@JoinColumn(name="artikl")
	private Artikl artikl;

	public StavkaPorudzbine() {
	}

	public StavkaPorudzbine(int id, int redniBroj, double kolicina, double cena, String jedinicaMere,
			Porudzbina porudzbina, Artikl artikl) {
		this.id = id;
		this.redniBroj = redniBroj;
		this.kolicina = kolicina;
		this.cena = cena;
		this.jedinicaMere = jedinicaMere;
		this.porudzbina = porudzbina;
		this.artikl = artikl;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getRedniBroj() {
		return redniBroj;
	}

	public void setRedniBroj(int redniBroj) {
		this.redniBroj = redniBroj;
	}

	public double getKolicina() {
		return kolicina;
	}

	public void setKolicina(double kolicina) {
		this.kolicina = kolicina;
	}

	public double getCena() {
		return cena;
	}

	public void setCena(double cena) {
		this.cena = cena;
	}

	public String getJedinicaMere() {
		return jedinicaMere;
	}

	public void setJedinicaMere(String jedinicaMere) {
		this.jedinicaMere = jedinicaMere;
	}

	public Porudzbina getPorudzbina() {
		return porudzbina;
	}

	public void setPorudzbina(Porudzbina porudzbina) {
		this.porudzbina = porudzbina;
	}

	public Artikl getArtikl() {
		return artikl;
	}

	public void setArtikl(Artikl artikl) {
		this.artikl = artikl;
	}
	
	
	
	

}
