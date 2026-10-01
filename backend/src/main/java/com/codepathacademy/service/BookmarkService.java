package com.codepathacademy.service;

import com.codepathacademy.dto.request.BookmarkRequest;
import com.codepathacademy.dto.response.BookmarkResponse;
import com.codepathacademy.entity.Bookmark;
import com.codepathacademy.entity.User;
import com.codepathacademy.exception.ResourceNotFoundException;
import com.codepathacademy.repository.BookmarkRepository;
import com.codepathacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<BookmarkResponse> getBookmarks(String username, String itemType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        List<Bookmark> list;
        if (itemType != null && !itemType.isBlank() && !"ALL".equalsIgnoreCase(itemType)) {
            list = bookmarkRepository.findByUserIdAndItemTypeOrderByCreatedAtDesc(user.getId(), itemType.toUpperCase());
        } else {
            list = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        }

        return list.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public BookmarkResponse addBookmark(BookmarkRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        Optional<Bookmark> existing = bookmarkRepository.findByUserIdAndItemTypeAndItemId(
                user.getId(), request.getItemType().toUpperCase(), request.getItemId());
        if (existing.isPresent()) {
            return mapToResponse(existing.get());
        }

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .itemType(request.getItemType().toUpperCase())
                .itemId(request.getItemId())
                .title(request.getTitle())
                .pathUrl(request.getPathUrl())
                .build();

        return mapToResponse(bookmarkRepository.save(bookmark));
    }

    @Transactional
    public boolean toggleBookmark(BookmarkRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        Optional<Bookmark> existing = bookmarkRepository.findByUserIdAndItemTypeAndItemId(
                user.getId(), request.getItemType().toUpperCase(), request.getItemId());
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return false; // Removed
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .user(user)
                    .itemType(request.getItemType().toUpperCase())
                    .itemId(request.getItemId())
                    .title(request.getTitle())
                    .pathUrl(request.getPathUrl())
                    .build();
            bookmarkRepository.save(bookmark);
            return true; // Added
        }
    }

    @Transactional
    public void deleteBookmark(Long id, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark not found: " + id));

        if (!bookmark.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Bookmark not found");
        }
        bookmarkRepository.delete(bookmark);
    }

    private BookmarkResponse mapToResponse(Bookmark b) {
        return BookmarkResponse.builder()
                .id(b.getId())
                .itemType(b.getItemType())
                .itemId(b.getItemId())
                .title(b.getTitle())
                .pathUrl(b.getPathUrl())
                .createdAt(b.getCreatedAt())
                .build();
    }
}
