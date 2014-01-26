#ifndef CONFIG_H
#define CONFIG_H

#include <string>

using namespace std;

class Config
{
public:
	Config();
	Config(string, bool, bool, bool, string, string, string, string, string, string, string, string, string, string, string, string);
	~Config();
	string GetID();
	void SetID(string);
	bool GetRequired();
	void SetRequired(bool);
	bool GetReplace();
	void SetReplace(bool);
	void SetZeroReplace(bool);
	bool GetZeroReplace();
	void SetZeroReplaceValue(string);
	string GetZeroReplaceValue();
	string GetStartSection();
	void SetStartSection(string);
	string GetHeader();
	void SetHeader(string);
	string GetDelimiter();
	void SetDelimiter(string);
	string GetStartLine();
	void SetStartLine(string);
	string GetEndLine();
	void SetEndLine(string);
	string GetFooter();
	void SetFooter(string);
	string GetEndSection();
	void SetEndSection(string);
	string GetStartTagHead();
	void SetStartTagHead(string);
	string GetStartTagTail();
	void SetStartTagTail(string);
	string GetEndTagHead();
	void SetEndTagHead(string);
	string GetEndTagTail();
	void SetEndTagTail(string);
	friend ostream& operator<<(ostream&, const Config&);
	friend ostream& operator<<(ostream&, const Config*);
private:
	string m_id;
	bool m_required;
	bool m_replace;
	bool m_zero_replace;
	string m_zero_replace_value;
	string m_start_section;
	string m_header;
	string m_delimiter;
	string m_start_line;
	string m_end_line;
	string m_footer;
	string m_end_section;
	string m_start_tag_head;
	string m_start_tag_tail;
	string m_end_tag_head;
	string m_end_tag_tail;
};
#endif