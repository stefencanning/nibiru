#ifndef MAPLOADER_H
#define MAPLOADER_H

#include <iostream>
#include <string>
#include <iomanip>
#include <sstream>
#include <fstream>
#include <stdio.h>

#include "Map.h"
#include "Config.h"
#include "TinyXML2.h"

using namespace std;
using namespace tinyxml2;

class MapLoader
{
public:

	MapLoader();
	~MapLoader();
	//Load TMX Map
	Map* LoadMap(const char*);
	map<string, string> GetData();
	bool LoadConfig(const char*);
	void InsertData(string, string);
	//Insert a new layer configuration
	void InsertLayerConfig(string, Config*);
	//Config layers such as background, foreground, etc as configured by XML
	map<string, Config*>* GetLayerConfig();
	//Sets Map Data
	void SetData(map<string, string>&);
	//Generate Map Keys
	static string KeyGenerator(const int&, const int&);
	//Check if file Exists
	static bool FileExist(const string&);
	//Find and replace text in files (Start and End Tags)
	bool FindAndReplaceText(const string&);
	//Generates the Enchant Map Array
	bool GenerateEnchantMap(const string&);
	//Print Map
	void PrintMap(const string&);
	//Preprocessor to add XML escape characters to file line output
	string Escape(const string&);
private:
	Map* m_p_map;
	XMLDocument m_doc;
	map<string, string> m_data;
	map<string, Config*>* m_p_config;
	void ParseLayers(const char* file);
	int Transpose(int&);
};
#endif