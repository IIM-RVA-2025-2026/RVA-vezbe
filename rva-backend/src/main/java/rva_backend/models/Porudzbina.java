package rva_backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Porudzbina {
	
	@Id
	@SequenceGenerator(name="porudzbina_seq", sequenceName="porudzbina_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="porudzbina_seq")
	private int id;
	private Date datumPorudzbine;
	private Date datumIsporuke;
	private boolean placeno;
	private double iznos;
	
	//strani ključ
	@ManyToOne
	@JoinColumn(name = "dobavljac")
	private Dobavljac dobavljac;
	
	//bidirekciona veza
	@OneToMany(mappedBy="porudzbina", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<StavkaPorudzbine> stavkas;

	public Porudzbina() {
	}

	public Porudzbina(int id, Date datumPorudzbine, Date datumIsporuke, boolean placeno, double iznos,
			Dobavljac dobavljac) {
		this.id = id;
		this.datumPorudzbine = datumPorudzbine;
		this.datumIsporuke = datumIsporuke;
		this.placeno = placeno;
		this.iznos = iznos;
		this.dobavljac = dobavljac;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDatumPorudzbine() {
		return datumPorudzbine;
	}

	public void setDatumPorudzbine(Date datumPorudzbine) {
		this.datumPorudzbine = datumPorudzbine;
	}

	public Date getDatumIsporuke() {
		return datumIsporuke;
	}

	public void setDatumIsporuke(Date datumIsporuke) {
		this.datumIsporuke = datumIsporuke;
	}

	public boolean isPlaceno() {
		return placeno;
	}

	public void setPlaceno(boolean placeno) {
		this.placeno = placeno;
	}

	public double getIznos() {
		return iznos;
	}

	public void setIznos(double iznos) {
		this.iznos = iznos;
	}

	public Dobavljac getDobavljac() {
		return dobavljac;
	}

	public void setDobavljac(Dobavljac dobavljac) {
		this.dobavljac = dobavljac;
	}
	
	
	
	
}
