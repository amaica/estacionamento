package com.teste.pratico.service;



import com.teste.pratico.model.Cliente;
import com.teste.pratico.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public Cliente cadastrarCliente(Cliente cliente) {
        if (repository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado.");
        }
        return repository.save(cliente);
    }

    public Cliente buscarPorCpf(String cpf) {
        return repository.findByCpf(cpf).orElseThrow(() -> new RuntimeException("Cliente não encontrado."));
    }

    public List<Cliente> listarClientes() {
        return repository.findAll();
    }



    public Cliente atualizarCliente(Long id, Cliente clienteAtualizado) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());

        return repository.save(cliente);
    }

    public void excluirCliente(Long id) {
        Cliente cliente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        repository.delete(cliente);
    }
}
