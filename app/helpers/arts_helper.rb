module ArtsHelper
  def gallery_artist_name(art)
    return "" unless art.gallery_artist
    if art.gallery_artist.customer
      art.gallery_artist.customer.name
    else
      assign = link_to "Assign to member", "#assign_url"
      "#{art.gallery_artist.artist_name}: #{assign}".html_safe
    end
  end
end
