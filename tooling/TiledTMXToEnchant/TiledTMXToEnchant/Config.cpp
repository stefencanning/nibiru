#include "Config.h"
Config::Config()
{
	this->m_id = "undefined";
	this->m_required = false;
	this->m_replace = false;
	this->m_zero_replace = false;
	this->m_zero_replace_value = "0";
	this->m_start_section = "undefined";
	this->m_header = "undefined";
	this->m_delimiter = "undefined";
	this->m_start_line = "undefined";
	this->m_end_line = "undefined";
	this->m_footer = "undefined";
	this->m_end_section = "undefined";
	this->m_start_tag_head = "undefined";
	this->m_start_tag_tail = "undefined";
	this->m_end_tag_head = "undefined";
	this->m_end_tag_tail = "undefined";
}

Config::Config(string id,
	bool required,
	bool replace,
	bool zero_replace,
	string zero_replace_value,
	string start_section,
	string header,
	string delimiter,
	string start_line,
	string end_line,
	string footer,
	string end_section,
	string start_tag_head,
	string start_tag_tail,
	string end_tag_head,
	string end_tag_tail)
	:
	m_id(id),
	m_required(required),
	m_replace(replace),
	m_zero_replace(zero_replace),
	m_zero_replace_value(zero_replace_value),
	m_start_section(start_section),
	m_header(header),
	m_delimiter(delimiter),
	m_start_line(start_line),
	m_end_line(end_line),
	m_footer(footer),
	m_end_section(end_section),
	m_start_tag_head(start_tag_head),
	m_start_tag_tail(start_tag_tail),
	m_end_tag_head(end_tag_head),
	m_end_tag_tail(end_tag_tail)
{
}

string Config::GetID(){ return this->m_id; }
void Config::SetID(string id){ this->m_id = id; }
bool Config::GetRequired(){ return this->m_required; }
void Config::SetRequired(bool required) { this->m_required = required; }
bool Config::GetReplace() { return this->m_replace; };
void Config::SetReplace(bool replace) { this->m_replace = replace; };
void Config::SetZeroReplace(bool zero_replace) { this->m_zero_replace = zero_replace; };
bool Config::GetZeroReplace(){ return this->m_zero_replace; };
void Config::SetZeroReplaceValue(string zero_replace_value) { this->m_zero_replace_value = zero_replace_value; };
string Config::GetZeroReplaceValue(){ return this->m_zero_replace_value; };
string Config::GetStartSection(){ return this->m_start_section; };
void Config::SetStartSection(string start_section){ this->m_start_section = start_section;};
string Config::GetHeader(){ return this->m_header; };
void Config::SetHeader(string header){ this->m_header = header; };
string Config::GetDelimiter(){ return this->m_delimiter; };
void Config::SetDelimiter(string delimiter){ this->m_delimiter = delimiter; };
string Config::GetStartLine(){ return this->m_start_line; };
void Config::SetStartLine(string start_line){ this->m_start_line = start_line; };
string Config::GetEndLine(){ return this->m_end_line; };
void Config::SetEndLine(string end_line){ this->m_end_line = end_line; };
string Config::GetFooter(){ return this->m_footer; };
void Config::SetFooter(string footer){ this->m_footer = footer; };
string Config::GetEndSection(){ return m_end_section; };
void Config::SetEndSection(string end_section){ this->m_end_section = end_section; };
string Config::GetStartTagHead(){ return this->m_start_tag_head; };
void Config::SetStartTagHead(string start_tag_head){ this->m_start_tag_head = start_tag_head; };
string Config::GetStartTagTail(){ return this->m_start_tag_tail; };
void Config::SetStartTagTail(string start_tag_tail){ this->m_start_tag_tail = start_tag_tail; };
string Config::GetEndTagHead(){ return this->m_end_tag_head; };
void Config::SetEndTagHead(string end_tag_head){ this->m_end_tag_head = end_tag_head; };
string Config::GetEndTagTail(){ return this->m_end_tag_tail; };
void Config::SetEndTagTail(string end_tag_tail){ this->m_end_tag_tail = end_tag_tail; };

ostream& operator<<(ostream& os, const Config& o)
{
	os << "ID:" << o.m_id << endl;
	os << "Required:" << o.m_required << endl;
	os << "Replace:" << o.m_replace << endl;
	os << "Zero Replace:" << o.m_zero_replace << endl;
	os << "Zero Replace Value:" << o.m_zero_replace_value << endl;
	os << "Start Section:" << o.m_start_section << endl;
	os << "Header:" << o.m_header << endl;
	os << "Delimiter:" << o.m_delimiter << endl;
	os << "Start Line:" << o.m_start_line << endl;
	os << "End Line:" << o.m_end_line << endl;
	os << "Footer:" << o.m_footer << endl;
	os << "End Section:" << o.m_end_section << endl;
	os << "Start Tag Head:" << o.m_start_tag_head << endl;
	os << "Start Tag Tail:" << o.m_start_tag_tail << endl;
	os << "Required:" << o.m_end_tag_head << endl;
	os << "Required:" << o.m_end_tag_tail << endl;
	return os;
}

ostream& operator<<(ostream& os, const Config* o)
{
	os << "ID:" << o->m_id << endl;
	os << "Required:" << o->m_required << endl;
	os << "Replace:" << o->m_replace << endl;
	os << "Start Section:" << o->m_start_section << endl;
	os << "Header:" << o->m_header << endl;
	os << "Delimiter:" << o->m_delimiter << endl;
	os << "Start Line:" << o->m_start_line << endl;
	os << "End Line:" << o->m_end_line << endl;
	os << "Footer:" << o->m_footer << endl;
	os << "End Section:" << o->m_end_section << endl;
	os << "Start Tag Head:" << o->m_start_tag_head << endl;
	os << "Start Tag Tail:" << o->m_start_tag_tail << endl;
	os << "Required:" << o->m_end_tag_head << endl;
	os << "Required:" << o->m_end_tag_tail << endl;
	return os;
}