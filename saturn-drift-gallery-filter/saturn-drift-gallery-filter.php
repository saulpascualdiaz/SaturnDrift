<?php
/**
 * Plugin Name: Saturn Drift Gallery Filter
 * Description: Adds location and year filtering to the gallery
 * Version: 1.0
 * Author: saturn drift
 */

if (!defined('ABSPATH')) exit;

class SaturnDriftGalleryFilter {
    
    public function __construct() {
        add_action('wp_head', array($this, 'inject_metadata'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function enqueue_scripts() {
        wp_enqueue_script(
            'saturn-drift-filter',
            plugin_dir_url(__FILE__) . 'gallery-filter.js',
            array(),
            '1.0',
            true
        );
        wp_enqueue_style(
            'saturn-drift-filter-css',
            plugin_dir_url(__FILE__) . 'gallery-filter.css',
            array(),
            '1.0'
        );
    }
    
    public function inject_metadata() {
        // Check if we're on the gallery page by checking URL
        $current_url = $_SERVER['REQUEST_URI'];
        if (strpos($current_url, '/gallery') === false) {
            return;
        }
        
        $metadata = $this->get_metadata();
        if (!$metadata) return;
        
        // Inject metadata as JSON into a script tag
        echo '<script id="saturn-drift-metadata" type="application/json">';
        echo wp_json_encode($metadata);
        echo '</script>';
    }
    
    private function get_unique_locations($groups) {
        $locations = array();
        foreach ($groups as $group) {
            $key = $group['location'];
            $display = isset($group['locationDisplay']) ? $group['locationDisplay'] : $group['location'];
            $locations[$key] = $display;
        }
        return $locations;
    }
    
    private function get_metadata() {
        $json_file = plugin_dir_path(__FILE__) . 'gallery-groups-metadata.json';
        
        if (!file_exists($json_file)) {
            return null;
        }
        
        $json = file_get_contents($json_file);
        return json_decode($json, true);
    }
}

// Initialize plugin
new SaturnDriftGalleryFilter();
