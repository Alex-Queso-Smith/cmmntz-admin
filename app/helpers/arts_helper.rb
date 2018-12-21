module ArtsHelper
  def gallery_artist_name(art)
    return "" unless art.gallery_artist
    if art.gallery_artist.customer
      m = "#{art.gallery_artist.customer.name} as #{art.gallery_artist.artist_name} #{gallery_artist_assign_link(art, "Reassign")}"
    else
      assign = link_to "Assign to member", edit_gallery_artist_path(art.gallery_artist)
      m = "#{art.gallery_artist.artist_name}: #{gallery_artist_assign_link(art)}"
    end

    m.html_safe
  end

  def gallery_artist_assign_link(art, title = "Assign to member")
    link_to title, edit_gallery_artist_path(art.gallery_artist)
  end
end
