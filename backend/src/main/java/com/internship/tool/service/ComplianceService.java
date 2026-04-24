package com.internship.tool.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ComplianceService {

    private final AiServiceClient aiServiceClient;

    public ComplianceService(AiServiceClient aiServiceClient) {
        this.aiServiceClient = aiServiceClient;
    }

    public void create(String request) {
        enrichWithAi(request);
        System.out.println("Create method completed immediately");
    }

    @Async
    public void enrichWithAi(String request) {
        try {
            String result = aiServiceClient.describe(request);

            if (result != null) {
                System.out.println("AI Response:");
                System.out.println(result);
            } else {
                System.out.println("AI returned null");
            }

        } catch (Exception e) {
            System.out.println("AI call failed: " + e.getMessage());
        }
    }
}