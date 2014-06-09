# JsonResume

JsonResume creates pretty versions of resume from a single JSON input file. Output formats are specifically customized to modern resume templates. Also, there are a ton of customizations to the templates possible, to make your own version of resume created easily and super quickly.

## Installation

    $ npm install

## Usage

### Build the example JSON resume

    $ node build "example/prateek_cv.json"

## Markup Language

JSON is parsed as per the `markdown` standards. This implies all this works-
- \*\* **bold** \*\*, 
- \_ _italics_ \_, 
- script&lt;sup&gt;<sup>sup</sup>&lt;sup/&gt;,
- script&lt;sub&gt;<sub>sub</sub>&lt;sub/&gt;, 
- \[[href](#)\]\(#\), 
- <<[http://github.com](http://github.com)>>

## Contributing

Many awesome formats can be created by writing new mustache templates. We :heart: **Pull Requests**.

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
