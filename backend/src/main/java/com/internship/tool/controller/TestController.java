package com.internship.tool.controller;

import com.internship.tool.service.ComplianceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    private final ComplianceService complianceService;

    public TestController(ComplianceService complianceService) {
        this.complianceService = complianceService;
    }

    @GetMapping("/test")
    public String test() {
        complianceService.create("Password policy gap");
        return "Request accepted";
    }
}