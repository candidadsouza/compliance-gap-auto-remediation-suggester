package com.internship.tool.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiServiceClient {

    private final RestTemplate restTemplate;

    public AiServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String describe(String issue) {

        String url = "http://localhost:5000/describe";

        Map<String, Object> body = new HashMap<>();
        body.put("standard", "ISO 27001");
        body.put("department", "IT");
        body.put("control_area", "Access Control");
        body.put("current_situation", issue);
        body.put("expected_requirement", "Must meet policy");
        body.put("risk_level", "High");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        return response.getBody();
    }
}