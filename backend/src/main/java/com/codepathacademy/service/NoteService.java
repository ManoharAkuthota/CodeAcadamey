package com.codepathacademy.service;

import com.codepathacademy.dto.request.NoteRequest;
import com.codepathacademy.dto.response.NoteResponse;
import com.codepathacademy.entity.Note;
import com.codepathacademy.entity.Topic;
import com.codepathacademy.entity.User;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.NoteRepository;
import com.codepathacademy.repository.TopicRepository;
import com.codepathacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;

    @Transactional(readOnly = true)
    public List<NoteResponse> getNotes(String username, String search) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        List<Note> notes;
        if (search != null && !search.isBlank()) {
            notes = noteRepository.findByUserIdAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(user.getId(), search);
        } else {
            notes = noteRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
        }

        return notes.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NoteResponse getNoteByTopic(Long topicId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        return noteRepository.findByUserIdAndTopicId(user.getId(), topicId)
                .map(this::mapToResponse)
                .orElse(null);
    }

    @Transactional
    public NoteResponse saveOrUpdateNote(NoteRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        Topic topic = null;
        if (request.getTopicId() != null) {
            topic = topicRepository.findById(request.getTopicId()).orElse(null);
        }

        Note note = null;
        if (request.getTopicId() != null) {
            note = noteRepository.findByUserIdAndTopicId(user.getId(), request.getTopicId()).orElse(null);
        }

        if (note == null) {
            note = Note.builder()
                    .user(user)
                    .topic(topic)
                    .title(request.getTitle())
                    .contentMarkdown(request.getContentMarkdown())
                    .build();
        } else {
            note.setTitle(request.getTitle());
            note.setContentMarkdown(request.getContentMarkdown());
        }

        return mapToResponse(noteRepository.save(note));
    }

    @Transactional
    public void deleteNote(Long noteId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found: " + noteId));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Note not found");
        }
        noteRepository.delete(note);
    }

    private NoteResponse mapToResponse(Note n) {
        return NoteResponse.builder()
                .id(n.getId())
                .topicId(n.getTopic() != null ? n.getTopic().getId() : null)
                .topicTitle(n.getTopic() != null ? n.getTopic().getTitle() : null)
                .title(n.getTitle())
                .contentMarkdown(n.getContentMarkdown())
                .createdAt(n.getCreatedAt())
                .updatedAt(n.getUpdatedAt())
                .build();
    }
}
