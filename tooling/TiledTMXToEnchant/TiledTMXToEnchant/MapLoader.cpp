#include "Debug.h"
#include "Config.h"
#include "MapLoader.h"
#include "Map.h"
#include "Layer.h"

using namespace std;

MapLoader::MapLoader()
{
	m_p_map = new Map();
	m_p_config = new map<string, Config*>();
}

MapLoader::~MapLoader()
{
	delete(m_p_map);
}

bool MapLoader::LoadConfig(const char* file)
{
	bool result = false;

	DEBUG_MSG("Loading Config File");
	DEBUG_MSG(file);

	if (m_doc.LoadFile(file) == 0)
	{
		DEBUG_MSG("Fetching Config Information");

		XMLElement* configuration = m_doc.FirstChildElement("config")->FirstChildElement("layer");

		while (configuration != NULL)
		{
			//Populate layers
			Config* config = new Config();
			config->SetID(configuration->Attribute("name"));

			if (std::string(configuration->Attribute("required")) == "true")
				config->SetRequired(true);
			else
				config->SetRequired(false);

			if (std::string(configuration->Attribute("replace")) == "true")
			{
				config->SetReplace(true);
			}
			else
			{
				config->SetReplace(false);
			}

			if (std::string(configuration->Attribute("zero_replacement")) == "true")
			{
				config->SetZeroReplace(true);
				config->SetZeroReplaceValue("-1");
			}
			/*if (std::string(configuration->Attribute("zero_replacement")) == "true")
			{
				config->SetZeroReplace(true);
				config->SetZeroReplaceValue(std::string(configuration->Attribute("zero_replacement_value")));
			}
			else
			{
				config->SetZeroReplace(false);
				config->SetZeroReplaceValue("");
			}*/

			XMLElement* settings = configuration->FirstChildElement("data")->FirstChild()->ToElement();

			while (settings != NULL)
			{
				if (std::string(settings->Attribute("name")) == "start_section")
				{
					config->SetStartSection(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "header")
				{
					config->SetHeader(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "delimiter")
				{
					config->SetDelimiter(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "start_line")
				{
					config->SetStartLine(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "end_line")
				{
					config->SetEndLine(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "footer")
				{
					config->SetFooter(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "end_section")
				{
					config->SetEndSection(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "start_tag_head")
				{
					config->SetStartTagHead(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "start_tag_tail")
				{
					config->SetStartTagTail(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "end_tag_head")
				{
					config->SetEndTagHead(settings->Attribute("value"));
				}
				else if (std::string(settings->Attribute("name")) == "end_tag_tail")
				{
					config->SetEndTagTail(settings->Attribute("value"));
				}

				settings = settings->NextSiblingElement();
			}//End: Settings
			if (this->GetLayerConfig()->count(config->GetID()) == 0x00)
				this->InsertLayerConfig(config->GetID(), config);

			configuration = configuration->NextSiblingElement();
		}//End: Configuration
		result = true;
	}
	else
	{
		result = false;
	}
	return result;
}

Map* MapLoader::LoadMap(const char* file)
{
	DEBUG_MSG("Loading TMX File");
	DEBUG_MSG(file);

	if (m_doc.LoadFile(file) == 0)
	{
		DEBUG_MSG("Fetching Map Information");
		XMLElement* element = m_doc.FirstChildElement("map");
		DEBUG_MSG(element->GetText());

		if (element != NULL)
		{
			m_p_map->SetWidth(atoi(element->Attribute("width")));
			m_p_map->SetHeight(atoi(element->Attribute("height")));

			DEBUG_MSG("Map Width");
			DEBUG_MSG(m_p_map->GetWidth());
			DEBUG_MSG("Map Height");
			DEBUG_MSG(m_p_map->GetHeight());

			this->ParseLayers(file);
		}
	}
	return m_p_map;
}

void MapLoader::ParseLayers(const char* file)
{
	string layer;
	int gid;
	string key;
	Config* value;
	bool loop = true;
	Layer* tileLayer = NULL;

	//Fetch the list of potential layers
	for (map <string, Config*>::iterator i = this->GetLayerConfig()->begin(); i != this->GetLayerConfig()->end(); ++i)
	{
		if (m_doc.LoadFile(file) == 0) // Loop through finding and processing each layer
		{
			key = (*i).first;
			value = (*i).second;

			XMLElement* layers = m_doc.FirstChildElement("map")->FirstChildElement("layer");

			while (loop)
			{
				layer = layers->Attribute("name");

				if (layer == value->GetID())
				{
					string msg = "Processing [" + std::string(value->GetID()) + "] Layer";
					DEBUG_MSG(msg.c_str());
					tileLayer = new Layer();

					XMLElement* tile = layers->FirstChildElement("data")->FirstChild()->ToElement();

					if (tile != NULL)
					{
						gid = atoi(tile->Attribute("gid"));

						for (int i = 0; i < m_p_map->GetHeight(); i++)
						{
							for (int j = 0; j < m_p_map->GetWidth(); j++)
							{
								gid = Transpose(gid); //Transpose map values
								tileLayer->AddTile(KeyGenerator(i, j), gid);

								tile = tile->NextSiblingElement();
								if (tile != NULL)
								{
									gid = atoi(tile->Attribute("gid"));
								}
							}
						}

						m_p_map->AddLayer(layer, tileLayer);//Add finished layer to Map

					}
				}

				layers = layers->NextSiblingElement();

				if (layers == NULL)
				{
					loop = false;
				}
			}//End: While gids
		}//End: File loaded
		loop = true; //End: Reset loop
	}//End: for each item is elements (id)
}

int MapLoader::Transpose(int& v)
{
	if (v != 0x00)
	{
		return v - 0x01;
	}
	else
	{
		return v;
	}
}

bool MapLoader::GenerateEnchantMap(const string& input)
{
	bool result = false;

	if (MapLoader::FileExist(input))
	{
		string key;
		Config* value;
		Layer* layer = NULL;

		DEBUG_MSG("Map file found");
		Map* world = this->LoadMap(input.c_str());

		if (!(world->GetLayers()).empty())
		{
			for (map <string, Config*>::iterator i = this->GetLayerConfig()->begin(); i != this->GetLayerConfig()->end(); ++i)
			{
				key = (*i).first;
				value = (*i).second;

				if (world->LayerCount(value->GetID()) >= 0x01)
				{
					string msg = "Processing Layer:" + value->GetID();
					DEBUG_MSG(msg.c_str());
					ostringstream oss_value;
					map <string, int> data;
					string s_value;

					layer = world->GetLayers().at(value->GetID());
					data = layer->GetTiles();

					s_value.append(value->GetStartSection());

					for (int i = 0; i < world->GetHeight(); i++)
					{
						s_value.append(value->GetStartLine());
						for (int j = 0; j < world->GetWidth(); j++)
						{
							if (value->GetReplace() == true || value->GetZeroReplace() == true)
							{
								if (value->GetZeroReplace())
								{
									if (data.at(MapLoader::KeyGenerator(i, j)) == 0)
									{
										oss_value << setw(3) << setfill(' ') << value->GetZeroReplaceValue(); //Fill with value
									}
									else
									{
										oss_value << setw(3) << setfill(' ') << data.at(MapLoader::KeyGenerator(i, j)); //Fill with value
									}
								}
								else
								{
									if (data.at(MapLoader::KeyGenerator(i, j)) != 0)
									{
										oss_value << setw(3) << setfill(' ') << -1; //Fill with -1
									}
									else
									{
										oss_value << setw(3) << setfill(' ') << 0; //Fill with 0
									}
								}
							}
							else
							{
								oss_value << setw(3) << setfill(' ') << data.at(MapLoader::KeyGenerator(i, j)); //Fill with value
							}

							if (j != (world->GetWidth() - 1))
							{
								oss_value << value->GetDelimiter();
							}

							s_value.append(oss_value.str());
							oss_value.str("");
						}
						if (i == (world->GetHeight() - 1))
						{
							s_value.append(value->GetEndLine());
						}
						else
						{
							s_value.append(value->GetEndLine() + value->GetDelimiter());
						}
						s_value.append("\n");
					}

					s_value.append(value->GetEndSection());
					this->InsertData(value->GetID(), s_value);
					result = true;
				}
			}
		}
	}
	return result;
}

map<string, string> MapLoader::GetData()
{
	return m_data;
}

void MapLoader::InsertData(string k, string v)
{
	m_data.insert(pair<string, string>(k, v));
}

void MapLoader::InsertLayerConfig(string key, Config* value)
{
	string msg;
	DEBUG_MSG("Inserting Layer MarkUp Layer");
	msg = "Key: " + std::string(key);
	DEBUG_MSG(msg.c_str());
	msg = "Value: " + std::string(value->GetID());
	DEBUG_MSG(msg.c_str());
	DEBUG_MSG(value);

	this->m_p_config->insert(pair<string, Config*>(key, value));
}

map<string, Config*>* MapLoader::GetLayerConfig()
{
	return m_p_config;
}

void MapLoader::SetData(map<string, string>& data)
{
	m_data = data;
}

string MapLoader::KeyGenerator(const int& i, const int& j)
{
	string key = "";
	key += i;
	key += ",";
	key += j;
	return key;
}

bool MapLoader::FileExist(const string& name)
{
	bool result = false;
	ifstream f(name.c_str());
	result = f.is_open();
	if (result)
		f.close();
	return result;
}

bool MapLoader::FindAndReplaceText(const string& output)
{
	bool result = false;
	string current = "current.js";

	int os; //output stream
	bool skip = false;

	string start_tag = "";
	string end_tag = "";

	string key;
	Config* value;

	string line_out = "";

	//Loop through layer configurations
	for (map <string, Config*>::iterator i = this->GetLayerConfig()->begin(); i != this->GetLayerConfig()->end(); ++i)
	{
		ifstream output_file(output);
		ofstream current_file(current);

		key = (*i).first;
		value = (*i).second;

		start_tag = value->GetStartTagHead() + value->GetID() + value->GetStartTagTail();
		end_tag = value->GetEndTagHead() + value->GetID() + value->GetEndTagTail();

		cout << value << endl;

		if (FileExist(output))
		{
			while (getline(output_file, line_out))
			{
				if (((os = line_out.find(start_tag, 0x00)) != string::npos) && !skip)
				{
					current_file << line_out << endl;

					if (m_data.count(value->GetID()) >= 0x01)
					{
						current_file << m_data.at(value->GetID());
					}
					skip = true;
					string msg = line_out + "\n";
					if (m_data.count(value->GetID()) >= 0x01)
					{
						msg += m_data.at(value->GetID()) + "\n";
					}
					DEBUG_MSG(msg.c_str());
				}
				else if (((os = line_out.find(end_tag, 0x00)) != string::npos) && skip)
				{
					current_file << line_out << endl;
					skip = false;
					string msg = line_out + "\n";
					DEBUG_MSG(msg.c_str());
				}
				else
				{
					if (!skip)
						current_file << line_out << endl;
				}
			}

			//Close the files and change roles
			output_file.close();
			current_file.close();

			ifstream in_file(current);
			ofstream out_file(output);

			if (out_file.is_open() && in_file.is_open())
			{
				string line;
				while (getline(in_file, line))
				{
					out_file << this->Escape(line) << endl;
				}
			}//End copy across

			in_file.close();
			output_file.close();

			//Attempt to delete temp file
			if (remove(current.c_str()) != 0x00)
			{
				result = false;
			}
			else
			{
				result = true;
			}
		}
	}//End loop through keys
	return result;
}

void MapLoader::PrintMap(const string& key)
{
	if (!m_data.empty())
	{
		if (m_data.count(key) >= 0x01)
		{
			string data = m_data.at(key);
			DEBUG_MSG("Printing Map Data");
			DEBUG_MSG(key.c_str());
			DEBUG_MSG(data.c_str());
		}
		else
		{
			string msg = "Generated Map data not found for [" + key + "]";
			DEBUG_MSG(msg.c_str());
		}
	}

}

string MapLoader::Escape(const string& value)
{
	string result;
	for (string::const_iterator i = value.begin(); i != value.end(); i++)
	{
		char c = *i;
		if (c == '\\' && i != value.end())
		{
			if (i++ != value.end()){
				switch (*i) {
				case '\\':
					c = '\\'; break;
				case 'n':
					c = '\n'; break;
				case 't':
					c = '\t'; break;
				default:
					continue;
				}
			}
		}
		result += c;
	}
	return result;
}