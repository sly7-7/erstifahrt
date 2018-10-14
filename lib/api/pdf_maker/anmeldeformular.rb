require 'i18n'
require 'prawn'

require_relative '../models/student'

I18n.load_path << './config/locale/de.yml'
I18n.default_locale = :de

module Erstifahrt::Api
  module PDFMaker
    class Anmeldeformular < Prawn::Document
      ROOT = File.expand_path '../../assets', __FILE__

      DATE_FORMAT = '%d. %B %Y'

      def self.make id
        puts Student.find(id)
        pdf = new Student.find(id), margin: [100, 72], page_size: 'A4', background: "#{ROOT}/bg.png"
        pdf.make
      end

      def initialize(student, options = {}, &block)
        super(options, &block)
        @student = student
      end

      def make
        pad_bottom(12) { header }

        pad_bottom(36) { details }

        text "Mir ist bewusst, dass im Falle meiner Absage die Schutzgebühr nur dann zurück erstattet wird, wenn zwingende Gründe (z.B. Krankheit) vorliegen. Außerdem ist mir bewusst, dass ich für durch mich entstandene Schäden selbst haftbar bin."

        sign "Datum, Unterschrift Teilnehmer"

        cut_rule

        h2 "Quittung"
        pad_bottom(12) { text "Die Schutzgebühr in Höhe von #{sprintf('%.2f', @student.trip.fee).gsub(/\./, ',').gsub(/,00/, '')} Euro wurde beglichen und das Alter des Teilnehmers/der Teilnehmerin überprüft. Weitere Informationen folgen vor Abfahrt an die angegebene E-Mail-Adresse." }

        text "Name: #{@student.first_name} #{@student.last_name}"

        sign "Datum, Unterschrift, Stempel des Fachschaftsrats"

        self
      end

      private

      def start_date
        I18n.l @student.trip.departure_at, format: DATE_FORMAT
      end

      def end_date
        date = @student.trip.departure_at.to_time + 2*24*3600
        I18n.l date, format: DATE_FORMAT
      end

      def header
        h1 "Anmeldung zur #{@student.trip.title}", align: :center, style: :bold

        text "Hiermit melde ich mich verbindlich zur Erstifahrt vom #{start_date} bis zum #{end_date} an."
      end

      def h1 s, options = {}
        pad(12) { text s, options.merge(size: 18) }
      end

      def h2 s, options = {}
        pad(10) { text s, options.merge(size: 16) }
      end

      def h3 s, options = {}
        pad(8) { text s, options.merge(size: 24) }
      end

      def details
        tabsize = 100
        text "Name:", style: :bold
        draw_text "#{@student.first_name} #{@student.last_name}", at: [tabsize, cursor + 6]
        text "Uni-Mail:", style: :bold
        draw_text @student.email, at: [tabsize, cursor + 6]
        text "Geburtsdatum:", style: :bold
        draw_text I18n.l(@student.date_of_birth, format: '%d. %B %Y'), at: [tabsize, cursor + 6]
        text "Studiengang:", style: :bold
        draw_text @student.subject, at: [tabsize, cursor + 6]
        text "Essen:", style: :bold
        draw_text @student.nutrition, at: [tabsize, cursor + 6]
        text "Hinweise:", style: :bold
        draw_text @student.comment || '-', at: [tabsize, cursor + 6]
      end

      def cut_rule
        pad(24) {
          dash [5, 2]
          stroke_horizontal_line(-70, bounds.width + 70, at: cursor)
          undash
        }
        image "#{ROOT}/scissors.png", at: [-36, cursor + 33], scale: 0.01
      end

      def sign caption
        pad_top(60) { stroke_horizontal_line 0, 250, at: cursor }
        pad_top(6) { text caption, size: 9 }
      end
    end
  end
end
