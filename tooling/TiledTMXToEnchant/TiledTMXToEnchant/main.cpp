#include <iostream>
#include <string>
#include <map>
#include <fstream>
#include <sstream>

#include "Debug.h"
#include "MapLoader.h"
#include "Map.h"

using namespace std;

int main(int argc, char** argv)
{
	int debug = 0x01;

	bool process = true; //check to see if method calls are successfull prior to proceeding
	string config = "config.xml";
	string input = "map.tmx";
	string update = "game.js";

	bool auto_update = false;

	DEBUG_MSG("*******************************************************");

	if (argc <= 0x01)
	{
		DEBUG_MSG("usage:\n");
		DEBUG_MSG("argv[0]");
		DEBUG_MSG("config.xml filename");
		DEBUG_MSG("Tiled map.tmx filename");
		DEBUG_MSG("Game JavaScript filename");
	}
	else
	{
		if (argc == 0x02){
			config = argv[0x01];
			DEBUG_MSG(argv[0x00]);
			DEBUG_MSG(argv[0x01]);
		}
		else if (argc == 0x03){
			config = argv[0x01];
			input = argv[0x02];
			DEBUG_MSG(argv[0x00]);
			DEBUG_MSG(argv[0x01]);
			DEBUG_MSG(argv[0x02]);
		}
		else if (argc == 0x04){
			config = argv[0x01];
			input = argv[0x02];
			update = argv[0x03];
			DEBUG_MSG(argv[0x00]);
			DEBUG_MSG(argv[0x01]);
			DEBUG_MSG(argv[0x02]);
			DEBUG_MSG(argv[0x03]);
			auto_update = true;
		}
	}

	DEBUG_MSG("\n\nUsing filesnames, ensure these are in the same folder as executable\nand path to file is correct");
	DEBUG_MSG("\n");
	DEBUG_MSG(config.c_str());
	DEBUG_MSG(input.c_str());
	DEBUG_MSG(update.c_str());
	DEBUG_MSG("\n\n");

	DEBUG_MSG("*******************************************************");

	//Load Map
	MapLoader* loader = new MapLoader();

	process = loader->LoadConfig(config.c_str());

	if (process)
	{
		process = loader->GenerateEnchantMap(input);
	}
	else
	{
		return 1;
	}

	if (!process)
	{
		DEBUG_MSG("*******************************************************");
		string msg = "Map file [" + input + "] not found!";
		DEBUG_MSG(msg.c_str());
		DEBUG_MSG("*******************************************************");
	}

	if (MapLoader::FileExist(update) && process)
	{
		if (!loader->FindAndReplaceText(update))
		{
			DEBUG_MSG("*******************************************************");
			string msg = "Error updating " + update;
			DEBUG_MSG(msg.c_str());
			DEBUG_MSG("*******************************************************");
		}
	}
	else
	{
		DEBUG_MSG("*******************************************************");
		string msg = "Error updating JavaScript file [" + update + "]!";
		DEBUG_MSG(msg.c_str());
		DEBUG_MSG("*******************************************************");
	}

	DEBUG_MSG("Cleaning up");

	delete(loader);
}