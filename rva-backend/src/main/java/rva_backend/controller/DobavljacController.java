package rva_backend.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rva_backend.models.Dobavljac;
import rva_backend.service.DobavljacService;

@RestController
@CrossOrigin
public class DobavljacController {

@Autowired
private DobavljacService service;


@GetMapping("dobavljac")
public ResponseEntity<List<Dobavljac>> getAll(){
	List<Dobavljac> dobavljacs = service.getAll();
    return new ResponseEntity<>(dobavljacs, HttpStatus.OK);
}

@GetMapping("dobavljac/{id}")
public ResponseEntity<Dobavljac> getOne(@PathVariable("id") Integer id){
    if (service.findById(id).isPresent()) {
    	Optional<Dobavljac> dobavljac = service.findById(id);
        return new ResponseEntity<>(dobavljac.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}

@GetMapping("dobavljac/adresa/{adresa}")
public ResponseEntity<List<Dobavljac>> getByAdresa(@PathVariable("adresa") String naziv){
	List<Dobavljac> dobavljacs = service.findByAdresaContainingIgnoreCase(naziv);
    return new ResponseEntity<>(dobavljacs, HttpStatus.OK);
}

@PostMapping("dobavljac")
public ResponseEntity<Dobavljac> addDobavljac(@RequestBody Dobavljac dobavljac) {
	Dobavljac savedDobavljac = service.save(dobavljac);
    URI location = URI.create("/dobavljac/" + savedDobavljac.getId());
	return ResponseEntity.created(location).body(savedDobavljac);
}

@PutMapping(value = "dobavljac/{id}")
public ResponseEntity<Dobavljac> updateDobavljac(@RequestBody Dobavljac dobavljac, @PathVariable("id") Integer id) {
    if (service.existsById(id)) {
    	dobavljac.setId(id);
        Dobavljac savedDobavljac = service.save(dobavljac);
        return ResponseEntity.ok().body(savedDobavljac);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}

@DeleteMapping("dobavljac/{id}")
public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {

    if (service.existsById(id)) {
    	service.deleteById(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }
    return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
}

}