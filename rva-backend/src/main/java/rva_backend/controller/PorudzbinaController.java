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

import rva_backend.models.Porudzbina;
import rva_backend.service.PorudzbinaService;

@RestController
@CrossOrigin
public class PorudzbinaController {
	
    @Autowired
    private PorudzbinaService service;


    @GetMapping("porudzbina")
    public ResponseEntity<List<Porudzbina>> getAll() {
        List<Porudzbina> porudzbinas = service.getAll();
        return new ResponseEntity<>(porudzbinas, HttpStatus.OK);
    }
    
   @GetMapping("porudzbina/{id}")
    public ResponseEntity<Porudzbina> getOne(@PathVariable("id") Integer id) {
        if (service.findById(id).isPresent()) {
            Optional<Porudzbina> porudzbinaOpt = service.findById(id);
            return new ResponseEntity<>(porudzbinaOpt.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("placenePorudzbine")
    public ResponseEntity<List<Porudzbina>> placenePorudzbine() {
        List<Porudzbina> porudzbinas = service.findByPlacenoTrue();
        return new ResponseEntity<>(porudzbinas, HttpStatus.OK);
    }

   @PostMapping("porudzbina")
    public ResponseEntity<Porudzbina> addPorudzbina(@RequestBody Porudzbina porudzbina) {
        Porudzbina savedPorudzbina = service.save(porudzbina);
        URI location = URI.create("/porudzbina/" + savedPorudzbina.getId());
        return ResponseEntity.created(location).body(savedPorudzbina);
    }

   @PutMapping(value = "porudzbina/{id}")
    public ResponseEntity<Porudzbina> updatePorudzbina(@RequestBody Porudzbina porudzbina,
            @PathVariable("id") Integer id) {
        if (service.existsById(id)) {
            porudzbina.setId(id);
            Porudzbina savedPorudzbina = service.save(porudzbina);
            return ResponseEntity.ok().body(savedPorudzbina);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("porudzbina/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Integer id) {

        if (service.existsById(id)) {
        	service.deleteById(id);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        }
        return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
    }



}