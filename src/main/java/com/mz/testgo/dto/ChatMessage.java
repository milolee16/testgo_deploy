package com.mz.testgo.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String room;
    private String sender;
    private String message;
}