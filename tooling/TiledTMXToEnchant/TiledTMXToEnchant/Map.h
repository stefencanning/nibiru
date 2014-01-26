#ifndef MAP_H
#define MAP_H

#include <vector>
#include <string>
#include <map>

#include "Layer.h"

using namespace std;

class Map
{
public:
	int GetWidth();
	void SetWidth(int);
	int GetHeight();
	void SetHeight(int);
	void AddLayer(string, Layer*);
	map<string, Layer*> GetLayers();
	int Map::LayerCount(string&);
private:
	map<string, Layer*> m_layers;
	int m_width;
	int m_height;
};
#endif