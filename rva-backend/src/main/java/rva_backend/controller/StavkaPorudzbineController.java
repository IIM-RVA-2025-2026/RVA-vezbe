package rva_backend.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva_backend.models.Porudzbina;
import rva_backend.models.StavkaPorudzbine;
import rva_backend.service.PorudzbinaService;
import rva_backend.service.StavkaPorudzbineService;

@RestController
@CrossOrigin
public class StavkaPorudzbineController {
	
	@Autowired
	public StavkaPorudzbineService service;
	
	@Autowired
	public PorudzbinaService porudzbinaService;
	
    @GetMapping("stavkaPorudzbine")
    public ResponseEntity<List<StavkaPorudzbine>> getAll() {
        List<StavkaPorudzbine> stavkaPorudzbines = service.getAll();
        return new ResponseEntity<>(stavkaPorudzbines, HttpStatus.OK);
    }
    
    @GetMapping("stavkaPorudzbine/{id}")
    public ResponseEntity<StavkaPorudzbine> getOne(@PathVariable("id") Integer id) {
        if (service.findById(id).isPresent()) {
            Optional<StavkaPorudzbine> stavkaPorudzbineOpt = service.findById(id);
            return new ResponseEntity<>(stavkaPorudzbineOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
	
	@GetMapping("/stavkaPorudzbine/cena/{cena}")
	public ResponseEntity<List<StavkaPorudzbine>> getStavkaPorudzbineCena(@PathVariable("cena") double cena) {
		List<StavkaPorudzbine> stavkaPorudzbines = service.findByCenaLessThan(cena);
		return new ResponseEntity<>(stavkaPorudzbines, HttpStatus.OK);
	}
	
	@GetMapping("/stavkeZaPorudzbinu/{id}")
	public ResponseEntity<List<StavkaPorudzbine>> getAllStavkasForPorudzbina(@PathVariable("id") Integer id) {
		Optional<Porudzbina> porudzbina = porudzbinaService.findById(id);
		if(porudzbina.isPresent()) {
			List<StavkaPorudzbine> stavkas = service.findByPorudzbina(porudzbina.get());
			return new ResponseEntity<>(stavkas, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
    @PostMapping("stavkaPorudzbine")
    public ResponseEntity<StavkaPorudzbine> addOne(@RequestBody StavkaPorudzbine stavkaPorudzbine) {
        if (!porudzbinaService.existsById(stavkaPorudzbine.getPorudzbina().getId())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        StavkaPorudzbine savedStavkaPorudzbine = service.save(stavkaPorudzbine);
        URI location = URI.create("/stavkaPorudzbine/" + savedStavkaPorudzbine.getId());
        return ResponseEntity.created(location).body(savedStavkaPorudzbine);
    }

   @PutMapping("stavkaPorudzbine/{id}")
    public ResponseEntity<StavkaPorudzbine> updateOne(@RequestBody StavkaPorudzbine stavkaPorudzbine,
            @PathVariable("id") Integer id) {
        if (!service.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        stavkaPorudzbine.setId(id);
        StavkaPorudzbine savedStavkaPorudzbine = service.save(stavkaPorudzbine);
        return ResponseEntity.ok().body(savedStavkaPorudzbine);
    }

   @DeleteMapping("stavkaPorudzbine/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {		   

        if (service.existsById(id)) {
        	service.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }

        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }
	
}
