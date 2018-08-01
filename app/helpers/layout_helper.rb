module LayoutHelper

  def title(page_title, show_header = false)
    content_for(:title) { page_title.to_s }
    @show_header = show_header
  end

  def navbar_brand(txt_str)
    content_for(:navbar_brand) { txt_str.to_s }
  end

  def show_header?
    @show_header
  end

end